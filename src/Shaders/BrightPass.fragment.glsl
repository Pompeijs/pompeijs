#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_colorMapSampler;

varying vec2 v_uv;

void main()
{
	vec4 finalColor = texture2D(u_colorMapSampler, v_uv);
	finalColor *= 2.5;
	finalColor = finalColor * finalColor * finalColor * finalColor * finalColor * finalColor * finalColor * finalColor;

	gl_FragColor = finalColor;
}