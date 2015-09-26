#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_diffuse;

varying vec2 v_uv;

void main () {
    vec4 finalColor = texture2D(u_diffuse, v_uv);

    gl_FragColor = finalColor;
}
