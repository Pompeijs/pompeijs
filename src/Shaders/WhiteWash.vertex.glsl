#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;
attribute vec2 a_uv;

uniform mat4 u_worldViewProjection;

varying vec2 v_uv;

void main()
{
	v_uv = a_uv;
	
	vec4 pos = u_worldViewProjection * vec4(a_position, 1.0);
	gl_Position = pos;
}