export const orbVertexShader = `
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
export const orbFragmentShader = `
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

  // Deliberate, clearly-visible wave bands, radiating outward from the
  // sphere's "north pole" and travelling forever. Built entirely from a
  // single continuous sin() of (angle, time) — unlike a fract()-based
  // loop, a plain sine never has a seam/reset to hide, so the motion is
  // smooth by construction, indefinitely, with no easing tricks needed.
  float poleWave(vec3 p, float t) {
    float angle = acos(clamp(dot(normalize(p), vec3(0.0, 1.0, 0.0)), -1.0, 1.0));

    float band = sin(angle * 3.2 - t * 0.9) * 0.5 + 0.5; // 0..1, smooth forever
    band = pow(band, 6.0); // sharpen the soft sine into a distinct band

    // Fade out right at the two poles, where every band would otherwise
    // pinch into a single point and read as a distracting spike.
    float poleFade = smoothstep(0.0, 0.3, angle) * smoothstep(3.14159, 2.6, angle);

    return band * poleFade;
  }

  float totalHeight(vec3 p, vec3 touch, float touchInfluence, float t) {
    float h = rippleHeight(p, t);
    h += touchHeight(p, touch, t) * touchInfluence * 1.2;
    h += poleWave(p, t) * 0.6; // the wave also gently bumps the surface, not just glows
    return h;
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

    // The traveling wave bands, as a direct glow — this is what actually
    // makes the wave READ as a wave, rather than only nudging the bump
    // map (which mostly changes how existing light reflects, and is too
    // subtle to notice on its own). A little brighter during a glitch
    // burst, so it stays cohesive with everything else that scales with uGlitch.
    float wave = poleWave(vPosition, uTime);
    vec3 waveColor = uRimColor * wave * (0.18 + uGlitch * 0.12);

    float scan = sin(vViewPosition.y * 40.0 + uTime * 6.0) * 0.5 + 0.5;
    float scanline = mix(1.0, 0.94, scan * uGlitch);

    vec3 color = uBaseColor + rim + highlight + touchColor + waveColor;
    color *= scanline;

    float hash = fract(sin(dot(floor(vViewPosition.xy * 8.0), vec2(12.9898, 78.233))) * 43758.5453);
    float dropout = step(0.985, hash);
    color = mix(color, vec3(0.0), dropout * uGlitch * 0.6);

    gl_FragColor = vec4(color, 1.0);
  }
`;
