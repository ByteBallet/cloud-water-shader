import { useRef } from 'react';
import { extend, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

extend({ ShaderMaterial: THREE.ShaderMaterial });

const SeaReflectionShader = {
  uniforms: {
    texture1: { value: null },
    texture2: { value: null },
  },
  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D texture1;
    uniform sampler2D texture2;
    varying vec2 vUv;

    void main() {
      vec4 texel1 = texture2D(texture1, vUv);
      vec4 texel2 = texture2D(texture2, vUv);
      vec3 reflectionColor = texel1.rgb * texel2.rgb * 0.5 + vec3(0.5);
      
      float alpha = 1.0;
      if (reflectionColor == vec3(0.0)) {
        alpha = 1.0;
      }

      gl_FragColor = vec4(reflectionColor, alpha);
    }
  `,
};

export const SeaReflection = () => {
  const materialRef = useRef();

  // Load the two wave textures
  const texture1 = useLoader(THREE.TextureLoader, 'texture1.png');
  const texture2 = useLoader(THREE.TextureLoader, 'texture2.png');

  // Animation loop to update texture offsets
  useFrame(() => {
    const elapsedTime = window.performance.now() * 0.001; // Convert milliseconds to seconds

    // Update texture offsets based on elapsed time
    const offsetX = Math.sin(elapsedTime) * 0.1; // Adjust the offset speed and magnitude as desired
    const offsetY = Math.cos(elapsedTime) * 0.1; // Adjust the offset speed and magnitude as desired

    // Set the texture offsets in the shader material
    materialRef.current.uniforms.texture1.value.offset.set(offsetX, offsetY);
    materialRef.current.uniforms.texture2.value.offset.set(-offsetX, -offsetY);
  });

  return (
    <mesh position={[0,0,10]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        ref={materialRef}
        args={[SeaReflectionShader]}
        uniforms={{
          texture1: { value: texture1 },
          texture2: { value: texture2 },
        }}
      />
    </mesh>
  );
};