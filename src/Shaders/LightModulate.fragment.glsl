#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_colorMapSampler; 
uniform sampler2D u_screenMapSampler;

varying vec2 v_uv;

void main() 
{		
	vec4 finalCol = texture2D(u_colorMapSampler, v_uv.xy);
	vec4 lightCol = texture2D(u_screenMapSampler, v_uv.xy);

	gl_FragColor = finalCol * lightCol;
}
