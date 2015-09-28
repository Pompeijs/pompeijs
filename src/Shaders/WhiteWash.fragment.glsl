#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_colorMapSampler;

varying vec2 v_uv;

void main() 
{
	float alpha = texture2D(u_colorMapSampler, v_uv).a;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
}
