import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Cloud } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Plane } from './Components/plane';
import { Ocean } from './Components/Water';
import './App.css';
import MeshBlock from './Components/MeshBlock';

const cloudLocation = [
  {
    position: [5, 40, 2],
    mx: 0,
    mz: 0,
  },
  {
    position: [5, 37, -2],
    mx: 0,
    mz: 0,
  },
  {
    position: [-5, 34, 2],
    mx: 0,
    mz: 0,
  },
  {
    position: [-5, 36, -2],
    mx: 0,
    mz: 0,
  },
  {
    position: [0, 35, 0],
    mx: 1,
    mz: -1,
  },
  {
    position: [0, 35, 0],
    mx: 1,
    mz: 1,
  },
  {
    position: [0, 35, 0],
    mx: -1,
    mz: 1,
  },
  {
    position: [0, 35, 0],
    mx: -1,
    mz: -1,
  },
];

function MovingCloud({ initialPosition, mx, mz }: any) {
  const [position, setPosition] = useState(initialPosition);
  const [opacity, setOpacity] = useState(1);

  useFrame((state, delta) => {
    setPosition((prevPosition:any) => [
      prevPosition[0] + mx* 0.1,
      prevPosition[1] + delta * 10,
      prevPosition[2] + mz* 0.1,
    ]);
    setOpacity((prevOpacity:any) => prevOpacity - 0.3 * delta);
  });

  return <Cloud position={position} speed={0.5} opacity={opacity} scale={[5, 2, 5]} segments={5}/>;
}

function BackCloud({ initialPosition, mx, mz, opacity, scale }: any) {
  const [position, setPosition] = useState(initialPosition);
  useFrame(() => {
    setPosition((prevPosition:any) => [
      prevPosition[0] + mx* 0.01,
      prevPosition[1],
      prevPosition[2] + mz* 0.01,
    ]);
  });

  return <Cloud position={position} opacity={opacity} speed={0} scale={scale} castShadow/>;
}

const Controls = () => {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  useLayoutEffect(() => {
    const controls = controlsRef.current;

    if (controls) {
      const cameraPosition = new THREE.Vector3();
      const cameraTarget = new THREE.Vector3();
      const cameraDirection = new THREE.Vector3();
      controls.addEventListener('change', () => {
        cameraPosition.copy(camera.position);
        cameraTarget.copy(controls.target);
        cameraDirection.subVectors(cameraTarget, cameraPosition);

        const h = 2 * Math.tan(camera.fov * Math.PI / 360) * camera.position.y;
        const w = h * camera.aspect;

        const minBound = new THREE.Vector3(-(240-w)/2, 50, -(135-h)/2);
        const maxBound = new THREE.Vector3((240-w)/2, 70, (135-h)/2);
        // Check if camera position is outside the boundary
        if (
          cameraPosition.x < minBound.x ||
          cameraPosition.x > maxBound.x ||
          cameraPosition.y < minBound.y ||
          cameraPosition.y > maxBound.y ||
          cameraPosition.z < minBound.z ||
          cameraPosition.z > maxBound.z
        ) {
          // Move camera position back within the boundary
          cameraPosition.clamp(minBound, maxBound);
          camera.position.copy(cameraPosition);
          controls.target.copy(cameraPosition.clone().add(cameraDirection));
          controls.update();
        }
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
    />
  );
};

const backCloudPosition = [
  {
    position: [-100, 10, -15],
    opacity: 0.8,
    scale: [2, 3, 3],
  },
  {
    position: [-150, 5, -20],
    opacity: 1,
    scale: [2, 1, 2],
  },
  {
    position: [-130, 7, -10],
    opacity: 1,
    scale: [1, 1, 3],
  },
  {
    position: [-20, 11, 20],
    opacity: 0.7,
    scale: [3, 2, 2],
  },
  {
    position: [30, 6, 10],
    opacity: 0.9,
    scale: [3, 1, 2],
  },
];

const MeshBlockLocation = [
  {
    id: 1,
    name: "FLAVOR FACTORY",
    position: [87, 1, 66],
    area: [17, 17],
  },
  {
    id: 2,
    name: "MINT MOUNTAIN",
    position: [120, 1, 95],
    area: [18, 18],
  },
  {
    id: 3,
    name: "THE FARBOR",
    position: [140, 1, 112],
    area: [18, 12.5],
  },
  {
    id: 4,
    name: "THE FARBOR",
    position: [128, 1, 63],
    area: [28, 28],
  },
  {
    id: 5,
    name: "THE DOME",
    position: [106, 1, 40],
    area: [20, 13],
  },
  {
    id: 6,
    name: "AIRDROP",
    position: [133, 1, 13],
    area: [10, 8.5],
  },
];

function App() {
  const [textureLoaded, setTextureLoaded] = useState(false);
  const textureLoader = new THREE.TextureLoader();
  const textureUrl = 'island-2400w.png';
  const material = new THREE.MeshBasicMaterial({
    map: null,
    color: 0xffffff,
    transparent: true,
    opacity: 1
  });
  const [selection, setSelection] = useState(-1);

  useEffect(() => {
    textureLoader.load(textureUrl, (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.colorSpace = THREE.SRGBColorSpace;

      material.map = texture;
      material.needsUpdate = true;

      setTextureLoaded(true);
    });
  }, [textureLoader, textureUrl]);

  return (
    <div>
      <Canvas camera={{ position: [0, 60, 0] }} shadows>
        <pointLight intensity={1} position={[0, 130, 0]} castShadow />
        <Plane position={new THREE.Vector3(-100, 20, 25)} />
        <Plane position={new THREE.Vector3(-100, 30, 55)} />        

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2, 0]} receiveShadow>
          <planeGeometry args={[240, 135]} />
          <primitive object={material} attach="material" />
        </mesh>
        {
          cloudLocation.map((cloud) => {
            return <MovingCloud initialPosition={cloud.position} mx={cloud.mx} mz={cloud.mz} />;
          })
        }
        {
          backCloudPosition.map((cloud) => {
            return <BackCloud initialPosition={cloud.position} mx={1} mz={-1} scale={cloud.scale} opacity={cloud.opacity} />;
          })
        }
        {
          MeshBlockLocation.map((block) => {
            return (
              <mesh
                onPointerOver={ () => ( block.id !== selection && setSelection(block.id)) }
                onPointerLeave={() => setSelection(-1)}
                rotation={[-Math.PI / 2, 0, 0]}
                position={new THREE.Vector3(block.position[0]-120, 1, block.position[2]-67.5)}
                material={new THREE.MeshStandardMaterial({ color: 0})}>
                  <planeGeometry args={[block.area[0], block.area[1]]}/>
              </mesh>
            );
          })
        }
        {
          MeshBlockLocation.map((block) => {
            if(block.id === selection)
              return <MeshBlock position={[block.position[0]-120, 5, block.position[2]-67.5]} type={block.name} />
          })
        }
        <Ocean />
        <Controls />
      </Canvas>
    </div>
  );
}

export default App;