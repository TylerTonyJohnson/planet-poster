attribute float t;
attribute float tOffset;

varying float vT;
varying float vTOffset;

void main() {
  vT = t;
  vTOffset = tOffset;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}