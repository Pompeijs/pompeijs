#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;
attribute vec2 a_uv;

varying vec2 v_uv;

void main() {
	v_uv = a_uv;
	v_uv.x = 0.5 * (1.0 + a_position.x); 
	v_uv.y = 0.5 * (1.0 + a_position.y); 
	
	gl_Position = vec4(a_position.x, a_position.y, 0.0, 1.0);
}
