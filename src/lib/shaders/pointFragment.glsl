uniform vec3 uColor;
uniform float uTime;
uniform float uDashLength;

varying float vT;
varying float vTOffset;

void main() {
  float dashStart = mod(uTime + vTOffset, 1.0);
  float dashEnd = dashStart + uDashLength;

  bool inDash = (vT >= dashStart && vT <= dashEnd)
             || (dashEnd > 1.0 && vT <= mod(dashEnd, 1.0));

  if (!inDash) discard;

  gl_FragColor = vec4(uColor, 1.0);
}