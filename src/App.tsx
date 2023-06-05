import { Cloud } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import './App.css';
import MeshBlock from './Components/MeshBlock';
import { Plane } from './Components/plane';
import { Controls } from './Components/CameraControls';
import { SeaReflection } from './Components/sky';

const cloudLocation = [
  {
    position: [60, 30, 15],
    mx: 1,
    mz: 1,
  },
  {
    position: [60, -30, 15],
    mx: 1,
    mz: -1,
  },
  {
    position: [-60, 30, 15],
    mx: -1,
    mz: 1,
  },
  {
    position: [-60, -30, 15],
    mx: -1,
    mz: -1,
  },
  {
    position: [60, 0, 15],
    mx: 1,
    mz: 0,
  },
  {
    position: [0, -30, 15],
    mx: 0,
    mz: -1,
  },
  {
    position: [-60, 0, 15],
    mx: -1,
    mz: 0,
  },
  {
    position: [0, 30, 15],
    mx: 0,
    mz: 1,
  },
  // {
  //   position: [0, 0, 15],
  //   mx: 1,
  //   mz: -1,
  // },
  // {
  //   position: [0, 0, 15],
  //   mx: 1,
  //   mz: 1,
  // },
  // {
  //   position: [0, 0, 15],
  //   mx: -1,
  //   mz: 1,
  // },
  // {
  //   position: [0, 0, 15],
  //   mx: -1,
  //   mz: -1,
  // },
];

function MovingCloud({ initialPosition, mx, mz }: any) {
  const [position, setPosition] = useState(initialPosition);
  const [opacity, setOpacity] = useState(1);

  useFrame((state, delta) => {
    setPosition((prevPosition:any) => [
      prevPosition[0] + mx*0.3,
      prevPosition[1] + mz*0.3,
      prevPosition[2] + delta*10,
    ]);
    // s etOpacity((prevOpacity:any) => prevOpacity - 0.1 * delta);
  });

  return <Cloud position={position} opacity={opacity} scale={[13, 10, 1]} segments={10} depth={10} width={1}/>;
}

function BackCloud({ initialPosition, mx, mz, opacity, scale }: any) {
  const [position, setPosition] = useState(initialPosition);
  useFrame(() => {
    setPosition((prevPosition:any) => {
      if(prevPosition[0] < -120 || prevPosition[2] < -80){
        prevPosition[0] = initialPosition[0]+80;
        prevPosition[1] = initialPosition[1]-80;
      }
      return [
        prevPosition[0] - mx* 0.01,
        prevPosition[1] - mz* 0.01,
        prevPosition[2],
      ]
    });
  });

  return <Cloud position={position} opacity={opacity} speed={0} scale={scale} />;
}

const backCloudPosition = [
  
  {
    position: [75, -50, 3],
    opacity: 0.2,
    scale: [3, 3, 1],
  },
  {
    position: [-65, -30, 3],
    opacity: 0.5,
    scale: [4, 4, 1],
  },
  {
    position: [-30, -40, 3],
    opacity: 0.5,
    scale: [3, 3, 1],
  },
  {
    position: [125, -30, 3],
    opacity: 0.3,
    scale: [4, 4, 1],
  },
];

const MeshBlockLocation = [
  {
    id: 1,
    name: "flavor",
    position: [88, 64, 1],
    area: [17, 17],
    size: [41.1, 6.8],
    flag: [-1, -1],
  },
  {
    id: 2,
    name: "mountain",
    position: [119, 92, 1],
    area: [18, 18],
    size: [48.2, 6.8],
    flag: [-1, -1],
  },
  {
    id: 3,
    name: "harbor",
    position: [140, 112, 1],
    area: [18, 12.5],
    size: [37.5, 6.8],
    flag: [1, 1],
  },
  {
    id: 4,
    name: "harbor2",
    position: [128, 63, 1],
    area: [28, 28],
    size: [40.1, 6.8],
    flag: [1, -1],
  },
  {
    id: 5,
    name: "dome",
    position: [108, 42, 1],
    area: [20, 13],
    size: [29, 19.8],
    flag: [-1, -1],
  },
  {
    id: 6,
    name: "air",
    position: [132, 16, 1],
    area: [10, 8.5],
    size: [41.5, 14.3],
    flag: [1, 1],
  },
];

const PlaneMesh = React.memo(({ material }: { material: THREE.MeshBasicMaterial}) => {
  return (
    <>
      <mesh position={[0, 0, 0]} material={material}>
        <planeGeometry args={[240, 135]} />
      </mesh>
      <Plane position={new THREE.Vector3(-100, 25, 3)} shadow={false}/>
      <Plane position={new THREE.Vector3(-105, 20, 2)} shadow={true}/>
    </>
  );
}, () => true);



function App() {
  const textureLoader = new THREE.TextureLoader();
  const textureUrl = 'island-2400w.png';
  const [selection, setSelection] = useState(-1);

  const material = new THREE.MeshBasicMaterial({
    map: null,
    color: 0xffffff,
    transparent: true,
    opacity: 1
  });

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
      <Canvas camera={{ fov: 75}}>
        <pointLight position={[0, 0, 150]} />
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
                position={new THREE.Vector3(block.position[0]-120, 67.5-block.position[1], -1)}
                material={new THREE.MeshStandardMaterial({ color: 0 })}>
                  <planeGeometry args={[block.area[0], block.area[1]]}/>
              </mesh>
            );
          })
        }
        {
          MeshBlockLocation.map((block) => {
              return <MeshBlock position={[block.position[0]-120, 67.5-block.position[1], 2]}
                type={block.name} size={block.size} flag={block.flag}
                mouseHoverFlag={block.id === selection}/>
          })
        }
      <Controls dampingFactor={0.5}/>
      </Canvas>
    </div>
  );
}

export default App;