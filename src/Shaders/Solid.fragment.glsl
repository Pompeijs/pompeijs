#ifdef GL_ES
precision highp float;
#endif

varying vec3 v_position;

void main () {
    gl_FragColor = vec4(v_position.xyz, 1.0);
}
