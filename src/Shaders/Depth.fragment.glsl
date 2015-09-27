#ifdef GL_ES
precision highp float;
#endif

#ifdef ALPHA
uniform sampler2D diffuse;
#endif

varying vec4 v_depth;

#ifdef ALPHA
varying vec2 v_uv;
#endif

void main()
{
	float depth = v_depth.z / v_depth.x;
	float alpha = 1.0;

	#ifdef ALPHA
	alpha = texture2D(diffuse, v_uv).a;
	#endif
	
	gl_FragColor = vec4(depth, depth * depth, 0.0, alpha);
}