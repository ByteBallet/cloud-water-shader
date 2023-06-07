import { useRef } from "react";
import { useLoader, extend } from '@react-three/fiber';
import * as THREE from 'three';

// Define the shader code
const waterCausticShader = {
  uniforms: {
    iResolution: { value: new THREE.Vector2() },
    iTime: { value: 0 },
    iMouse: { value: new THREE.Vector4() },
    iChannel0: { value: null },
    iChannel1: { value: null },
  },
  vertexShader: `
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    #define tex(a,b) textureLod(a,b,0.)

    uniform vec2 iResolution;
    uniform float iTime;
    uniform vec4 iMouse;
    uniform sampler2D iChannel0;
    uniform sampler2D iChannel1;
    uniform sampler2D iChannel2;
    uniform sampler2D iChannel3;
    
    float waterStrength = 2.;
    float waterDye = 0.075;
    float sin120 = 0.86602540378;
    
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        vec2 px = 2. / iResolution.xy,
            uv = fragCoord.xy * px * 0.5,
            time = vec2(0., iTime * 0.05),
            uvtime = uv + time;
        
        vec2 mouse = (iMouse.z > 0.)? iMouse.xy / iResolution.xy: vec2(.5);
        
        //p123 is sampling the water (render buffer A)
        vec3 p1 = vec3(uv, tex(iChannel0, uv).r);
        uv.x += px.x;
        vec3 p2 = vec3(uv, tex(iChannel0, uv).r);
        uv.x -= px.x;
        uv.y += px.y;
        vec3 p3 = vec3(uv, tex(iChannel0, uv).r);
        uv.y -= px.y;
            
        //height map value
        float rockHeight = tex(iChannel1, uvtime).r,
                //water height value
                waterHeight = p1.z,
                //depth of water
                depth = clamp(waterHeight - rockHeight, 0., 1.);
        
        //calculate surface normal of water
            vec3 norm = cross(p2-p1, p3-p1);
        norm.z *= 50./waterStrength;
        //calculate specular
        float reflection = smoothstep(0.994, 1.0, refract(-normalize(norm), normalize(vec3(uv - mouse, -1.)), 0.6).z);
            //get a less extreme surface normal
        norm.z *= ((1. - depth) * 50.)/waterStrength;
        norm = normalize(norm);  
        //distort with water
        vec2 displacement = norm.xy * float(int(waterHeight > rockHeight));
        
        //r0123 is sampling rock height map
        vec3 r0 = vec3(uv, tex(iChannel1, uvtime + displacement).r);
        
        //sample equalateral triangle around initial point
        uv.y += px.y;
        p1 = vec3(uv, tex(iChannel1, uv + time + displacement).r);
        
        //down 0.75 pixels
        uv.y -= px.y * 1.5;
        //right a sin120 pixel
        uv.x += px.x * sin120;
        p2 = vec3(uv, tex(iChannel1, uv + time + displacement).r);
        
        //left two sin120 pixels
        uv.x -= px.x * sin120 * 2.;
        p3 = vec3(uv, tex(iChannel1, uv + time + displacement).r);
        
        //get the rocks surface normal
        vec3 rockNorm = normalize(cross(p2-p1, p3-p1) * vec3(1., 0.5, 1.));
        
        //fine detail calculation
        vec3 norm1 = normalize(cross(p1-r0, p2-r0));
        vec3 norm2 = normalize(cross(p2-r0, p3-r0));
        vec3 norm3 = normalize(cross(p3-r0, p1-r0));
        
        //oh baby
        float AOfactor = 2.0 - sqrt(length(rockNorm*3.0 - (norm1+norm2+norm3)));
        
        //rock brightness, clamp at -.2 to overexpose rocks a bit
        float rockDiffuse = 0.3 + clamp(reflect(rockNorm, normalize(vec3(uv - mouse, -1.))).z, -.2, 1.),
                lightPow = 1.5 - distance(uv, mouse);
        
        //sample height map at calculated place and tiem
        vec2 smp = uvtime + rockNorm.xy * 0.01;
        
        //rock texture * brightness * diffuse + brightness
        fragColor = vec4((tex(iChannel2, smp).rgb + 0.2) *
                        (tex(iChannel3, smp).rgb + 0.2) *
                        rockDiffuse * AOfactor * p1.z * lightPow
                        , 1.);
        
        //get local max for noise function and assume its always wet
    
        //draw water
        if (waterHeight > rockHeight) {
            //enhance contrast for 'wet' surfaces
            fragColor = fragColor * 1.2 - 0.1;
            //calculate a color that is more blue as depth increases
            vec3 color = vec3(rockHeight + 0.5 - waterDye * 2., rockHeight + 0.6 - waterDye, max(rockHeight + 0.4, rockHeight + 0.6) + waterDye);
            //sample height map at calculated place and tiem
            float amb = 0.8 - p1.z;
            //new blending eq
            fragColor.rgb = fragColor.rgb * (color + amb) + (color * lightPow * lightPow * 0.2) + reflection * (lightPow * 2. - 1.75);   
        }      
    }
    void main() {
        vec2 fragCoord = gl_FragCoord.xy;
        vec4 fragColor;
        mainImage(fragColor, fragCoord);
        gl_FragColor = fragColor;
    }
  `,
};

extend({ ShaderMaterial: THREE.ShaderMaterial });

export const WaterCaustic = () => {
  const materialRef = useRef();
  const material_one = new THREE.MeshPhongMaterial();

  const texture0 = useLoader(THREE.TextureLoader, "texture0.png");
//   const texture1 = useLoader(THREE.TextureLoader, "texture1.png");
//   const texture2 = useLoader(THREE.TextureLoader, "texture2.png");
//   const texture3 = useLoader(THREE.TextureLoader, "texture3.png");

//   useFrame(({ clock }) => {
//     const elapsedTime = clock.getElapsedTime();
//     materialRef.current.uniforms.iTime.value = elapsedTime;
//   });

  return (
    <mesh position={[0,0,10]}>
      <planeBufferGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        args={[waterCausticShader]}
        uniforms={{
          iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          iMouse: { value: new THREE.Vector4() },
          iChannel0: { value: texture0 },
        }}
      />
    </mesh>
  );
};