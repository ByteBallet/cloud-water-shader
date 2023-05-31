import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
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
      prevPosition[0] + mx* 0.02,
      prevPosition[1] + delta * 10,
      prevPosition[2] + mz* 0.02,
    ]);
    setOpacity((prevOpacity:any) => prevOpacity - 0.3 * delta);
  });

  return <Cloud position={position} speed={0.5} opacity={opacity} scale={[5, 2, 5]} segments={5}/>;
}

function BackCloud({ initialPosition, mx, mz, opacity, scale }: any) {
  const [position, setPosition] = useState(initialPosition);
  useFrame(() => {
    setPosition((prevPosition:any) => {
      if(prevPosition[0] < -160 || prevPosition[2] < -100){
        prevPosition[0] = 100 + initialPosition[0];
        prevPosition[2] = 60 + initialPosition[2];
      }
      return [
        prevPosition[0] - mx* 0.01,
        prevPosition[1],
        prevPosition[2] + mz* 0.01,
      ]
    });
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
        if (
          cameraPosition.x < minBound.x ||
          cameraPosition.x > maxBound.x ||
          cameraPosition.y < minBound.y ||
          cameraPosition.y > maxBound.y ||
          cameraPosition.z < minBound.z ||
          cameraPosition.z > maxBound.z
        ){
          cameraPosition.clamp(minBound, maxBound);
          camera.position.copy(cameraPosition);
          controls.target.copy(cameraPosition.clone().add(cameraDirection));
          if (cameraPosition.y >= maxBound.y) {
            controls.enableZoom = false;
          } else {
            controls.enableZoom = true;
          }
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
    position: [100, 10, 40],
    opacity: 0.5,
    scale: [3, 3, 3],
  },
  {
    position: [60, 7, 50],
    opacity: 0.5,
    scale: [4, 4, 4],
  },
  {
    position: [-30, 7, 40],
    opacity: 0.7,
    scale: [3, 3, 3],
  },
  {
    position: [-10, 8, 30],
    opacity: 0.5,
    scale: [5, 5, 5],
  },
  {
    position: [0, 6, 35],
    opacity: 0.7,
    scale: [4, 4, 4],
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

const PlaneMesh = React.memo(({ material }: { material: THREE.MeshBasicMaterial}) => {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 2, 0]} receiveShadow>
        <planeGeometry args={[240, 135]} />
        <primitive object={material} attach="material" />
      </mesh>
      <Plane position={new THREE.Vector3(-100, 6, 25)} shadow={false}/>
      <Plane position={new THREE.Vector3(-110, 3, 35)} shadow={true}/>
    </>
  );
}, (prevProps, nextProps) => {
  return true;
});

function App() {
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
    });
  }, [textureLoader, textureUrl]);

  return (
    <div>
      <Canvas camera={{ position: [0, 70, 0] }} shadows>
        <pointLight intensity={1} position={[0, 150, 0]} castShadow />
        <PlaneMesh material={material}/>
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
                onPointerLeave={() => {setSelection(-1)}}
                rotation={[-Math.PI / 2, 0, 0]}
                position={new THREE.Vector3(block.position[0]-120, 1, block.position[2]-67.5)}
                material={new THREE.MeshStandardMaterial({ color: 0 })}>
                  <planeGeometry args={[block.area[0], block.area[1]]}/>
              </mesh>
            );
          })
        }
        {
          MeshBlockLocation.map((block) => {
            if(block.id === selection)
              return <MeshBlock position={[block.position[0]-150, 3, block.position[2]-80]} type={block.name} />
          })
        }
        <Ocean />
        <Controls />
      </Canvas>
    </div>
  );
}

export default App;