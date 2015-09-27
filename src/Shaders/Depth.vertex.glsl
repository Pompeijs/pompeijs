#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;

#ifdef ALPHA
attribute vec2 a_uv;
#endif

uniform mat4 u_worldViewProjection;
uniform float u_maxD;

varying vec4 v_depth;

#ifdef ALPHA
varying vec2 v_uv;
#endif

void main()
{
	#ifdef ALPHA
	v_uv = a_uv;
	#endif
	
	vec4 pos = u_worldViewProjection * vec4(a_position, 1.0);
	
	v_depth = vec4(u_maxD, pos.y, pos.z, pos.w);
	
	gl_Position = pos;
}