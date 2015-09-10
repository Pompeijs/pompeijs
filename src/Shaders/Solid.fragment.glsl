#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_diffuse;

varying vec2 v_uv;

void main () {
    gl_FragColor = vec4(v_uv.xy, 1.0, 1.0) + texture2D(u_diffuse, v_uv);
}
