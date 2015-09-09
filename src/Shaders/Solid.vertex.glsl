#ifdef GL_ES
precision highp float;
#endif

uniform mat4 u_worldViewProjection;

attribute vec3 a_position;

varying vec3 v_position;

void main () {
    v_position = a_position;

    gl_Position = u_worldViewProjection * vec4(a_position.xyz, 1.0);
}
