#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;

varying vec2 v_uv;

const vec2 middle = vec2(0.5, 0.5);

void main() 
{
	v_uv = a_position.xy * middle + middle;
	
	gl_Position = vec4(a_position.x, a_position.y, 0.0, 1.0);
}
