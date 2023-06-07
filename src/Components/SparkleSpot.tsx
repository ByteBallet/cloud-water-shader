import { useRef } from "react";
import { useFrame, useLoader, extend } from '@react-three/fiber';
import * as THREE from "three";

const material = {
    uniforms: {
		iResolution: { value: new THREE.Vector2() },
		iTime: { value: 0 },
		iChannel0: { value: null },
    },
    vertexShader: `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
		uniform vec2 iResolution;
		uniform float iTime;
		uniform sampler2D iChannel0;

		vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

		float snoise(vec2 v){
			const vec4 C = vec4(0.211324865405187, 0.366025403784439,-0.577350269189626, 0.024390243902439);
			vec2 i  = floor(v + dot(v, C.yy) );
			vec2 x0 = v -i + dot(i, C.xx);
			vec2 i1;
			i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
			vec4 x12 = x0.xyxy + C.xxzz;
			x12.xy -= i1;
			i = mod(i, 289.0);
			vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
			vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
			m = m*m ;
			m = m*m ;
			vec3 x = 2.0 * fract(p * C.www) - 1.0;
			vec3 h = abs(x) - 0.5;
			vec3 ox = floor(x + 0.5);
			vec3 a0 = x - ox;
			m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
			vec3 g;
			g.x  = a0.x  * x0.x  + h.x  * x0.y;
			g.yz = a0.yz * x12.xz + h.yz * x12.yw;
			return 130.0 * dot(m, g);
		}

		vec2 mapUV(vec2 uv) {
			return vec2(uv.x * iResolution.x / iResolution.y, uv.y);
		}

		void mainImage( out vec4 fragColor, in vec2 fragCoord )
		{
			vec2 uv = fragCoord/iResolution.xy;
			uv = mapUV(uv);
			vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

			float ftime= float(iTime)/10.;
			float f = snoise(uv*20.+ftime);
			f *= snoise(uv*30.+vec2(-1.,1.)*ftime);
			f *= abs(snoise(uv*5.));
			f = abs(f)-.15;
			col.rgb=vec3(smoothstep(.1,.3,f));
			fragColor = vec4(col,1);
			
			float threshold = 0.8; // Adjust this threshold value as needed
			if (fragColor.r < threshold && fragColor.g < threshold && fragColor.b < threshold) {
				fragColor.a = 0.0; // Set alpha to 0 for transparent color
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

export const CustomShaderMaterial = ({position} : any) => {
  const materialRef = useRef();
  const material_one = new THREE.MeshPhongMaterial();
  material_one.transparent = true;

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.iTime.value = clock.elapsedTime*3;
	  materialRef.current.needsUpdate = true;
    }
  });

  return (
    <mesh position={position}>
		<planeGeometry args={[384, 255]}/>
		<shaderMaterial 
			attach="material"
			ref={materialRef}
			args={[material]}
			uniforms={{
				iResolution: { value: new THREE.Vector2(384, 255) },
				iTime: { value: 0 }
			}}
			transparent={true}
		/>
    </mesh>
  );
};
