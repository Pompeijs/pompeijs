#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_colorMapSampler;
uniform sampler2D u_screenMapSampler;

varying vec2 v_uv;

void main()
{
	vec4 screenCol = texture2D(u_screenMapSampler, v_uv);
	vec4 bloomCol = texture2D(u_colorMapSampler, v_uv);

	gl_FragColor = screenCol * 0.9 + bloomCol * 0.5;
}
