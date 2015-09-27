#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_colorMapSampler;
uniform float u_screenX;
uniform float u_screenY;

varying vec2 v_uv;

void main() 
{
	vec2 offsetArray[7];
	#ifdef VERTICAL
	offsetArray[0] = vec2(0.0, 0.0);
	offsetArray[1] = vec2(-1.5 / float(u_screenX), 0.0);
	offsetArray[2] = vec2(1.5 / float(u_screenX), 0.0);
	offsetArray[3] = vec2(-2.5 / float(u_screenX), 0.0);
	offsetArray[4] = vec2(2.5 / float(u_screenX), 0.0);
	offsetArray[5] = vec2(-4.5 / float(u_screenX), 0.0);
	offsetArray[6] = vec2(4.5 / float(u_screenX), 0.0);
	#else
	offsetArray[0] = vec2(0.0, 0.0);
	offsetArray[1] = vec2(0.0, -1.5 / float(u_screenY));
	offsetArray[2] = vec2(0.0, 1.5 / float(u_screenY));
	offsetArray[3] = vec2(0.0, -2.5 / float(u_screenY));
	offsetArray[4] = vec2(0.0, 2.5 / float(u_screenY));
	offsetArray[5] = vec2(0.0, -4.5 / float(u_screenY));
	offsetArray[6] = vec2(0.0, 4.5 / float(u_screenY));
	#endif

	vec4 blurCol = vec4(0.0, 0.0, 0.0, 0.0);

	for(int i = 0;i < 7; ++i) {
		#ifdef VERTICAL
		blurCol += texture2D(u_colorMapSampler, clamp(v_uv + offsetArray[i] * 3.0, vec2(0.01, 0.001), vec2(0.999, 0.999)));
		#else
		blurCol += texture2D(u_colorMapSampler, clamp(v_uv + offsetArray[i] * 3.0, vec2(0.001, 0.01), vec2(0.999, 0.999)));
		#endif
	}
	
	blurCol /= 7.0;
	
	gl_FragColor = blurCol;
}