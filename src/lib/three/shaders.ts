export const orbVertexShader = `
  uniform float uTime;
  uniform float uHoverX;
  uniform float uHoverY;
  uniform vec3 uTouchPoint;
  uniform float uTouchInfluence;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying float vWaveBand;

  // Continuous ambient wobble made of three sine waves along different
  // axes, each with its own spatial frequency and time coefficient. It's
  // a cheap stand-in for 3D noise — no permutation/hash tables like a
  // full Simplex implementation needs — that still reads as an organic,
  // always-moving blob surface instead of an obviously repeating pattern.
  float ambientWave(vec3 p, float t) {
    float h = 0.0;
    h += sin(dot(p, normalize(vec3(1.0, 0.6, 0.2))) * 3.0 + t * 1.3) * 0.5;
    h += sin(dot(p, normalize(vec3(-0.4, 1.0, 0.7))) * 5.0 - t * 0.9) * 0.3;
    h += sin(dot(p, normalize(vec3(0.8, -0.3, 1.0))) * 7.0 + t * 1.7) * 0.2;
    return h;
  }

  // Traveling band radiating from the sphere's "north pole", forever —
  // built from a single continuous sin() of (angle, time), so it has no
  // seam/reset to hide and stays smooth by construction indefinitely.
  float poleWave(vec3 p, float t) {
    float angle = acos(clamp(dot(normalize(p), vec3(0.0, 1.0, 0.0)), -1.0, 1.0));

    float band = sin(angle * 3.2 - t * 0.9) * 0.5 + 0.5; // 0..1, smooth forever
    band = pow(band, 6.0); // sharpen the soft sine into a distinct band

    // Fade out right at the two poles, where every band would otherwise
    // pinch into a single point and read as a distracting spike.
    float poleFade = smoothstep(0.0, 0.3, angle) * smoothstep(3.14159, 2.6, angle);

    return band * poleFade;
  }

  // Concentric ripple ring radiating from the cursor's contact point,
  // like a finger touching a pool of black water. Decays with distance
  // so it stays a local disturbance instead of resonating the whole orb.
  float touchHeight(vec3 p, vec3 touch, float t) {
    float d = length(p - touch);
    return sin(d * 10.0 - t * 5.0) * exp(-d * 1.4);
  }

  const float AMBIENT_AMPLITUDE = 0.16;
  const float POLE_AMPLITUDE = 0.12;
  const float TOUCH_AMPLITUDE = 0.18;

  // Outward displacement for a given surface point, in world units.
  // The ambient wobble and traveling band are unconditional — the blob
  // keeps moving with nobody near it — the touch term is purely additive
  // on top, never a prerequisite for any of the motion.
  float totalDisplacement(vec3 p, vec3 touch, float touchInfluence, float t) {
    float h = ambientWave(p, t) * AMBIENT_AMPLITUDE;
    h += poleWave(p, t) * POLE_AMPLITUDE;
    h += touchHeight(p, touch, t) * touchInfluence * TOUCH_AMPLITUDE;
    return h;
  }

  void main() {
    vec3 dir = normalize(normal);

    // Sample two nearby points on the tangent plane so we can derive the
    // displaced surface's real normal afterwards, instead of reusing the
    // sphere's original (now-stale) vertex normal for lighting.
    float eps = 0.06;
    vec3 arbitrary = abs(dir.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent = normalize(cross(dir, arbitrary));
    vec3 bitangent = normalize(cross(dir, tangent));

    float h0 = totalDisplacement(position, uTouchPoint, uTouchInfluence, uTime);
    float h1 = totalDisplacement(position + tangent * eps, uTouchPoint, uTouchInfluence, uTime);
    float h2 = totalDisplacement(position + bitangent * eps, uTouchPoint, uTouchInfluence, uTime);

    // Real geometric displacement along the sphere's own radial
    // direction — this is what makes the silhouette itself wobble,
    // not just the shading.
    vec3 displaced = position + dir * h0;

    float dHt = (h1 - h0) / eps;
    float dHb = (h2 - h0) / eps;
    vec3 displacedNormal = normalize(dir - (tangent * dHt + bitangent * dHb));

    vec3 pos = displaced;
    pos.x += uHoverX * 0.15;
    pos.y += uHoverY * 0.1;

    vNormal = normalize(normalMatrix * displacedNormal);
    vPosition = pos;
    vWaveBand = poleWave(position, uTime);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const orbFragmentShader = `
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform vec3 uHighlightColor;
  uniform vec3 uTouchPoint;
  uniform float uTouchInfluence;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;
  varying float vWaveBand;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    vec3 n = normalize(vNormal);

    float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.0);
    vec3 rim = fresnel * uRimColor;

    vec3 lightDir = normalize(vec3(0.4, 0.8, 0.6));
    vec3 halfVec = normalize(lightDir + viewDir);
    float specular = pow(max(dot(n, halfVec), 0.0), 60.0);
    vec3 highlight = uHighlightColor * specular;

    // Soft glow right at the cursor's contact point — makes the touch
    // interaction readable even in the first frame, before the ripple
    // it spawns has visibly propagated across the surface.
    float touchDist = length(vPosition - uTouchPoint);
    float touchGlow = exp(-touchDist * 2.5) * uTouchInfluence;
    vec3 touchColor = uHighlightColor * touchGlow * 1.6;

    // Traveling wave band, computed once per-vertex in the vertex shader
    // and interpolated in here — this is what makes the wave clearly
    // READ as a wave, layered on top of what the real displacement
    // already does to the silhouette and the lighting.
    vec3 waveColor = uRimColor * vWaveBand * 0.18;

    vec3 color = uBaseColor + rim + highlight + touchColor + waveColor;

    gl_FragColor = vec4(color, 1.0);
  }
`;
