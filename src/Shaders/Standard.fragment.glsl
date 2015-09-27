#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D u_diffuse;
uniform sampler2D u_normal;

uniform mat4 u_world;
uniform vec3 u_cameraPosition;
uniform vec4 u_ambient;
uniform float u_specularStrength;
uniform float u_bumpStrength;

uniform vec3 u_lightPositions[NUMBER_OF_LIGHTS];
uniform vec4 u_lightColors[NUMBER_OF_LIGHTS];
uniform float u_lightIntensities[NUMBER_OF_LIGHTS];
uniform float u_lightSpecularPowers[NUMBER_OF_LIGHTS];

varying vec2 v_uv;
varying vec3 v_normal;
varying vec3 v_position;

void main () {
    vec4 baseColor = texture2D(u_diffuse, v_uv);
    vec4 normalColor = texture2D(u_normal, v_uv);
    
    vec3 normal = normalColor.yxz;
    vec4 totalDiffuse = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 totalSpecular = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 totalAmbient = u_ambient * baseColor;
    
    normal.xy *= 2.0;
    normal.xy -= 1.0;
    normal = (vec3(0.0, 0.0, 1.0) - normal) * u_bumpStrength + normal;
    normal = normalize(normal);
    
    vec3 vPositionW = vec3(u_world * vec4(v_position, 1.0));
    vec3 vNormalW = normalize(vec3(u_world * vec4(v_normal, 0.0)));
    vec3 viewDirectionW = normalize(u_cameraPosition - vPositionW);
    
    for (int i=0; i < NUMBER_OF_LIGHTS; i++) {
        vec3 lightVectorW = normalize(u_lightPositions[i] - vPositionW);
        float ndl = max(dot(vNormalW, lightVectorW), 0.0) - 0.1;
        vec3 reflection = normalize((( 2.0 * normal)) - lightVectorW);
        float rdv = max(0.0, dot(reflection, viewDirectionW));
        
        totalDiffuse += u_lightColors[i] * ndl * baseColor * u_lightIntensities[i];
		totalSpecular += ndl * u_lightColors[i] * (pow(rdv, u_lightSpecularPowers[i])) * u_lightIntensities[i];
    }
    
    vec4 finalColor = ( totalAmbient + totalDiffuse + (totalSpecular * u_specularStrength));
    
    if (finalColor.r > 1.0) { finalColor.gb += finalColor.r - 1.0; }
    if (finalColor.g > 1.0) { finalColor.rb += finalColor.g - 1.0; }
    if (finalColor.b > 1.0) { finalColor.rg += finalColor.b - 1.0; }

    gl_FragColor = finalColor;// + texture2D(u_normal, v_uv) * 0.0001;
}
