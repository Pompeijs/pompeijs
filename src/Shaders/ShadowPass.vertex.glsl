#ifdef GL_ES
precision highp float;
#endif

attribute vec3 a_position;
attribute vec3 a_normal;

uniform float u_maxD;
uniform float u_mapRes;
uniform vec3 u_lightPos;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldViewProjection2;

varying vec4 v_shadowMapSamplingPos;
varying vec4 v_mVar;

void main() 
{
	vec4 position = u_worldViewProjection * vec4(a_position, 1.0);
	vec4 shadowMapSamplingPos = u_worldViewProjection2 * vec4(a_position, 1.0);
	vec3 lightDir = normalize(u_lightPos - a_position);
	
	vec4 mVar = vec4(0.0, 0.0, 0.0, 0.0);
	mVar.x = shadowMapSamplingPos.z;
	mVar.y = dot(normalize(a_normal.xyz), lightDir);
	mVar.z = u_maxD;
	mVar.w = 1.0 / u_mapRes;
	
	v_shadowMapSamplingPos = shadowMapSamplingPos;
	v_mVar = mVar;

	gl_Position = position;
}