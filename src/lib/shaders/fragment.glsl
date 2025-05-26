uniform vec3 lightColor;
uniform vec3 darkColor;

varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main() {
  vec3 lightDir = normalize(vec3(0.0) - vWorldPosition); // light at world origin
  float intensity = dot(normalize(vWorldNormal), lightDir);

  vec3 color = intensity > 0.0 ? lightColor : darkColor;
  gl_FragColor = vec4(color, 1.0);
}