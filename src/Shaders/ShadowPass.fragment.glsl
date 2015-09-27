#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_shadowMapSampler;
uniform vec4 u_lightColor;

varying vec4 v_shadowMapSamplingPos;
varying vec4 v_mVar;

#ifdef VSM
float testShadow(vec2 texCoords, vec2 offset, float RealDist)
{
	vec4 shadTexCol = texture2D(ShadowMapSampler, texCoords + offset);

	float lit_factor = (RealDist <= shadTexCol.x) ? 1.0 : 0.0;

	float E_x2 = shadTexCol.y;
	float Ex_2 = shadTexCol.x * shadTexCol.x;
	float variance = min(max(E_x2 - Ex_2, 0.00001) + 0.000001, 1.0);
	float m_d = (shadTexCol.x - RealDist);
	float p = variance / (variance + m_d * m_d);

	return (1.0 - max(lit_factor, p)) / float(SAMPLE_AMOUNT);
}
#else
float testShadow(vec2 smTexCoord, vec2 offset, float realDistance)
{
	vec4 texDepth = texture2D(u_shadowMapSampler, vec2(smTexCoord + offset));
	float extractedDistance = texDepth.r;
	
	return (extractedDistance <= realDistance) ? (1.0  / float(SAMPLE_AMOUNT)) : 0.0;
}
#endif

void main() 
{
	vec4 SMPos = v_shadowMapSamplingPos;
	vec4 MVar = v_mVar;

	vec2 offsetArray[16];
	offsetArray[0] = vec2(0.0, 0.0);
	offsetArray[1] = vec2(0.0, 1.0);
	offsetArray[2] = vec2(1.0, 1.0);
	offsetArray[3] = vec2(-1.0, -1.0);
	offsetArray[4] = vec2(-2.0, 0.0);
	offsetArray[5] = vec2(0.0, -2.0);
	offsetArray[6] = vec2(2.0, -2.0);
	offsetArray[7] = vec2(-2.0, 2.0);
	offsetArray[8] = vec2(3.0, 0.0);
	offsetArray[9] = vec2(0.0, 3.0);
	offsetArray[10] = vec2(3.0, 3.0);
	offsetArray[11] = vec2(-3.0, -3.0);
	offsetArray[12] = vec2(-4.0, 0.0);
	offsetArray[13] = vec2(0.0, -4.0);
	offsetArray[14] = vec2(4.0, -4.0);
	offsetArray[15] = vec2(-4.0, 4.0);

    SMPos.xy = SMPos.xy / SMPos.w / 2.0 + vec2(0.5, 0.5);
	
	vec4 finalCol = vec4(0.0, 0.0, 0.0, 0.0);

	// If this point is within the light's frustum.
	#ifdef ROUND_SPOTLIGHTS
	float lengthToCenter = length(SMPos.xy - vec2(0.5, 0.5));
	if(SMPos.z - 0.01 > 0.0 && SMPos.z + 0.01 < MVar.z)
	#else
	vec2 clampedSMPos = clamp(SMPos.xy, vec2(0.0, 0.0), vec2(1.0, 1.0));
	if(clampedSMPos.x == SMPos.x && clampedSMPos.y == SMPos.y && SMPos.z > 0.0 && SMPos.z < MVar.z)
	#endif
	{
		float lightFactor = 1.0;
		float realDist = MVar.x / MVar.z - 0.002;
	
		for(int i = 0;i < SAMPLE_AMOUNT; i++)
			lightFactor -= testShadow(SMPos.xy, offsetArray[i] * MVar.w, realDist);

		// Multiply with diffuse.
		#ifdef ROUND_SPOTLIGHTS
		finalCol = u_lightColor * lightFactor * MVar.y * clamp(5.0 - 10.0 * lengthToCenter, 0.0, 1.0);
		#else
		finalCol = u_lightColor * lightFactor * MVar.y;
		#endif
	}
	
	#ifdef ROUND_SPOTLIGHTS
	gl_FragColor = finalCol;
	#else
	else
	{
		finalCol = u_lightColor * MVar.y;
	}
	gl_FragColor = finalCol + texture2D(u_shadowMapSampler, vec2(0.0, 0.0)) * 0.00001;
	#endif
}