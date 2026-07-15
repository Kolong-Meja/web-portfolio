/**
 * GLSL shaders for the header's "glitch orb" — the sphere that replaces
 * the old flat `radial-gradient` circle.
 *
 * Design note (v2): the orb's silhouette must stay a perfectly smooth
 * sphere — no vertex displacement at all. The earlier version displaced
 * vertices along their normals using simplex noise, which (especially at
 * a moderate vertex count) reads as sharp dents/kinks rather than a
 * smooth bulge. Instead, the "alive" / "liquid" look now comes entirely
 * from the fragment shader: the surface *normal* is perturbed by a
 * travelling-wave ripple field (like light catching ripples on a pool of
 * water), which changes how the surface is shaded without ever moving a
 * single vertex. The geometry — and therefore the outline — never
 * changes shape.
 */

/**
 * VERTEX SHADER
 * -------------
 * Deliberately minimal. The only thing it does besides the standard
 * position/normal transform is a small, uniform hover offset (every
 * vertex shifts by the same fixed amount toward the cursor) — that is a
 * translation, not a per-vertex distortion, so it can never introduce a
 * dent or a kink.
 */
export const orbVertexShader = /* glsl */ `
  uniform float uHoverX;
  uniform float uHoverY;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    // Object-space position, BEFORE the hover offset below — used in the
    // fragment shader to sample the ripple field at a stable coordinate
    // regardless of the (tiny) hover translation.
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
 * A dark, glossy "liquid" sphere:
 *
 *  1. `rippleHeight()` — three overlapping travelling sine waves at
 *     different directions/frequencies/speeds. Cheap stand-in for a
 *     fluid simulation; it's enough to read as a disturbed liquid
 *     surface, not a real height field.
 *  2. `rippleNormal()` — perturbs the *shading* normal using the local
 *     slope of that ripple field (finite-difference gradient along two
 *     tangent directions), the standard bump-mapping trick. The actual
 *     vertex position is never touched, so the silhouette stays a
 *     perfect sphere no matter how strong the ripple gets.
 *  3. Fresnel term (bright at grazing angles) + a small specular
 *     highlight against a fixed light direction — together these are
 *     what actually sells "wet/glossy" rather than "matte plastic ball".
 *  4. Glitch-only extras, layered on top and driven entirely by
 *     `uGlitch` (0 at rest, so they cost nothing visually when idle):
 *     RGB-split fresnel (chromatic aberration on the rim), a moving
 *     scanline band, and pseudo-random per-block dropouts.
 */
export const orbFragmentShader = /* glsl */ `
  uniform float uGlitch;
  uniform float uTime;
  uniform vec3 uBaseColor;
  uniform vec3 uRimColor;
  uniform vec3 uHighlightColor;

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

  vec3 rippleNormal(vec3 normal, vec3 pos, float strength, float t) {
    vec3 arbitrary = abs(normal.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent = normalize(cross(normal, arbitrary));
    vec3 bitangent = normalize(cross(normal, tangent));

    float eps = 0.06;
    float h0 = rippleHeight(pos, t);
    float h1 = rippleHeight(pos + tangent * eps, t);
    float h2 = rippleHeight(pos + bitangent * eps, t);

    float dT = (h1 - h0) / eps;
    float dB = (h2 - h0) / eps;

    return normalize(normal - (tangent * dT + bitangent * dB) * strength);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);

    // Ripples get a bit sharper/faster while glitching, like the "water"
    // briefly getting disturbed — still normal-only, never geometry.
    float rippleStrength = 0.05 + uGlitch * 0.10;
    vec3 n = rippleNormal(normalize(vNormal), vPosition, rippleStrength, uTime);

    float fresnelBase = 1.0 - max(dot(viewDir, n), 0.0);

    // Per-channel fresnel offset -> RGB fringing, scaled to zero at rest.
    float split = uGlitch * 0.1;
    float fresnelR = pow(clamp(fresnelBase - split, 0.0, 1.0), 2.0);
    float fresnelG = pow(fresnelBase, 2.0);
    float fresnelB = pow(clamp(fresnelBase + split, 0.0, 1.0), 2.0);
    vec3 rim = vec3(fresnelR, fresnelG, fresnelB) * uRimColor;

    // Fake glossy specular highlight — this is what actually reads as "wet".
    vec3 lightDir = normalize(vec3(0.4, 0.8, 0.6));
    vec3 halfVec = normalize(lightDir + viewDir);
    float specular = pow(max(dot(n, halfVec), 0.0), 60.0);
    vec3 highlight = uHighlightColor * specular;

    // Moving scanline band, only visible while glitching.
    float scan = sin(vViewPosition.y * 40.0 + uTime * 6.0) * 0.5 + 0.5;
    float scanline = mix(1.0, 0.94, scan * uGlitch);

    vec3 color = uBaseColor + rim + highlight;
    color *= scanline;

    // Cheap hash -> pseudo-random per-block dropout, like a decode error.
    float hash = fract(sin(dot(floor(vViewPosition.xy * 8.0), vec2(12.9898, 78.233))) * 43758.5453);
    float dropout = step(0.985, hash);
    color = mix(color, vec3(0.0), dropout * uGlitch * 0.6);

    gl_FragColor = vec4(color, 1.0);
  }
`;