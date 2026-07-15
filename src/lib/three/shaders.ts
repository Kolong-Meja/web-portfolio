/**
 * GLSL shaders for the header's "glitch orb".
 *
 * v3 adds cursor interactivity: `uTouchPoint` / `uTouchInfluence` are set
 * by GlitchOrb.render() from a per-frame raycast (see glitch-orb.ts), and
 * describe where — in the sphere's own local space — the cursor is
 * currently "touching" the surface, and how strongly (0 when the cursor
 * isn't over the orb at all, ramping to 1 when it is). The touch point
 * spawns its own radiating ripple + a soft glow, on top of the ambient
 * "water" ripple that was already there. Still zero vertex displacement
 * — the silhouette stays a perfect sphere no matter what the cursor
 * does.
 */

export const orbVertexShader = /* glsl */ `
  uniform float uHoverX;
  uniform float uHoverY;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;

    vec3 pos = position;
    pos.x += uHoverX * 0.15;
    pos.y += uHoverY * 0.1;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

/**
 * FRAGMENT SHADER
 * ---------------
 *  1. `rippleHeight()` — ambient travelling-wave ripple, always on.
 *  2. `touchHeight()` — a second ripple ring that radiates outward from
 *     `uTouchPoint`, an exponentially decaying sine wave centered on the
 *     cursor's contact point, scaled by `uTouchInfluence`.
 *  3. `rippleNormal()` — perturbs the *shading* normal using the local
 *     slope of (ambient + touch) height field. Bump-mapping only, never
 *     touches the actual vertex position.
 *  4. Fresnel + fake specular highlight for the glossy "liquid" look,
 *     plus an extra glow term right at the touch point so the cursor's
 *     presence is unmistakable even before the ripple is legible.
 *  5. Glitch-only extras (RGB-split fresnel, scanline, block dropout),
 *     all driven by `uGlitch` — 0 at rest, and can go a little past 1.0
 *     during a "mega glitch" burst for extra intensity (see
 *     Header.svelte's `setGlitchIntensity` calls).
 */
export const orbFragmentShader = /* glsl */ `
  uniform float uGlitch;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform vec3 uHighlightColor;
  uniform vec3 uTouchPoint;
  uniform float uTouchInfluence;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;

  float rippleHeight(vec3 p, float t) {
    float h = 0.0;
    h += sin(dot(p, normalize(vec3(1.0, 0.6, 0.2))) * 3.0 + t * 1.3) * 0.5;
    h += sin(dot(p, normalize(vec3(-0.4, 1.0, 0.7))) * 5.0 - t * 0.9) * 0.3;
    h += sin(dot(p, normalize(vec3(0.8, -0.3, 1.0))) * 7.0 + t * 1.7) * 0.2;
    return h;
  }

  // Concentric ripple ring radiating from the cursor's contact point,
  // like a finger touching a pool of black water. Decays with distance
  // so it stays a local disturbance instead of resonating the whole orb.
  float touchHeight(vec3 p, vec3 touch, float t) {
    float d = length(p - touch);
    return sin(d * 10.0 - t * 5.0) * exp(-d * 1.4);
  }

  float totalHeight(vec3 p, vec3 touch, float touchInfluence, float t) {
    return rippleHeight(p, t) + touchHeight(p, touch, t) * touchInfluence * 1.2;
  }

  vec3 rippleNormal(vec3 normal, vec3 pos, vec3 touch, float touchInfluence, float strength, float t) {
    vec3 arbitrary = abs(normal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent = normalize(cross(normal, arbitrary));
    vec3 bitangent = normalize(cross(normal, tangent));

    float eps = 0.06;
    float h0 = totalHeight(pos, touch, touchInfluence, t);
    float h1 = totalHeight(pos + tangent * eps, touch, touchInfluence, t);
    float h2 = totalHeight(pos + bitangent * eps, touch, touchInfluence, t);

    float dT = (h1 - h0) / eps;
    float dB = (h2 - h0) / eps;

    return normalize(normal - (tangent * dT + bitangent * dB) * strength);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);

    float rippleStrength = 0.05 + uGlitch * 0.10 + uTouchInfluence * 0.05;
    vec3 n = rippleNormal(normalize(vNormal), vPosition, uTouchPoint, uTouchInfluence, rippleStrength, uTime);

    float fresnelBase = 1.0 - max(dot(viewDir, n), 0.0);

    float split = uGlitch * 0.1;
    float fresnelR = pow(clamp(fresnelBase - split, 0.0, 1.0), 2.0);
    float fresnelG = pow(fresnelBase, 2.0);
    float fresnelB = pow(clamp(fresnelBase + split, 0.0, 1.0), 2.0);
    vec3 rim = vec3(fresnelR, fresnelG, fresnelB) * uRimColor;

    vec3 lightDir = normalize(vec3(0.4, 0.8, 0.6));
    vec3 halfVec = normalize(lightDir + viewDir);
    float specular = pow(max(dot(n, halfVec), 0.0), 60.0);
    vec3 highlight = uHighlightColor * specular;

    // Soft glow right at the cursor's contact point — makes the touch
    // interaction readable even in the first frame, before the ripple
    // it spawns has visibly propagated.
    float touchDist = length(vPosition - uTouchPoint);
    float touchGlow = exp(-touchDist * 2.5) * uTouchInfluence;
    vec3 touchColor = uHighlightColor * touchGlow * 1.6;

    float scan = sin(vViewPosition.y * 40.0 + uTime * 6.0) * 0.5 + 0.5;
    float scanline = mix(1.0, 0.94, scan * uGlitch);

    vec3 color = uBaseColor + rim + highlight + touchColor;
    color *= scanline;

    float hash = fract(sin(dot(floor(vViewPosition.xy * 8.0), vec2(12.9898, 78.233))) * 43758.5453);
    float dropout = step(0.985, hash);
    color = mix(color, vec3(0.0), dropout * uGlitch * 0.6);

    gl_FragColor = vec4(color, 1.0);
  }
`;
