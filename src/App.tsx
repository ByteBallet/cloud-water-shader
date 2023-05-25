import { useLayoutEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import './App.css';

const Controls = () => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useLayoutEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      controls.addEventListener('change', function () {
        console.log(controls.getDistance());
        // if (controls.target.y < -10) {
        //   controls.target.y = -10;
        //   camera.position.y = -10;
        // } else if (controls.target.y > 10) {
        //   controls.target.y = 10;
        //   camera.position.y = 10;
        // }
      });
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      mouseButtons={{
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE,
      }}
      touches={{
        ONE: THREE.TOUCH.PAN,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
      enableRotate={false}
      minDistance={5}
      maxDistance={8.5}
    />
  );
};

function App() {
  const [textureLoaded, setTextureLoaded] = useState(false);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const textureLoader = new THREE.TextureLoader();
  const textureUrl = 'island-2400w.png';
  // const textureUrl = "image_1.png";

  useLayoutEffect(() => {
    if (material.current && textureLoaded) {
      material.current.needsUpdate = true;
    }
  }, [textureLoaded]);

  textureLoader.load(textureUrl, (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set(10, 10);
    texture.colorSpace = THREE.SRGBColorSpace;
    if (material.current) {
      material.current.map = texture;
      material.current.needsUpdate = true;
    }
    setTextureLoaded(true);
  });

  return (
    <div>
      <Canvas>
        <mesh>
          <planeGeometry args={[24, 13.5]} />
          <meshBasicMaterial ref={material} toneMapped={false} />
        </mesh>
        {/* <OrbitControls
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
          }}
          touches={{
            ONE: THREE.TOUCH.PAN,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
          enableRotate={false} 
          minDistance={5}
          maxDistance={8.5}
        /> */}
        <Controls />
      </Canvas>
    </div>
  );
}

export default App;
