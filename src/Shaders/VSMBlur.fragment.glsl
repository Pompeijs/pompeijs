#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_colorMapSampler;
uniform float u_screenX;
uniform float u_screenY;

varying vec2 v_uv;

void main() 
{
	vec2 offsetArray[5];
	
	#ifdef VERTICAL_VSM_BLUR
	offsetArray[0] = vec2(0.0, 0.0);
	offsetArray[1] = vec2(0.0, -1.5 / u_screenY);
	offsetArray[2] = vec2(0.0, 1.5 / u_screenY);
	offsetArray[3] = vec2(0.0, -2.5 / u_screenY);
	offsetArray[4] = vec2(0.0, 2.5 / u_screenY);
	#else
	offsetArray[0] = vec2(0.0, 0.0);
	offsetArray[1] = vec2(-1.5 / u_screenX, 0.0);
	offsetArray[2] = vec2(1.5 / u_screenX, 0.0);
	offsetArray[3] = vec2(-2.5 / u_screenX, 0.0);
	offsetArray[4] = vec2(2.5 / u_screenX, 0.0);
	#endif

	vec4 blurCol = vec4(0.0, 0.0, 0.0, 0.0);

	for(int i = 0; i < 5; ++i)
	{
		blurCol += texture2D(u_colorMapSampler, clamp(v_uv + offsetArray[i], vec2(0.001, 0.001), vec2(0.999, 0.999)));
	}

	gl_FragColor = blurCol / 5.0;
}
