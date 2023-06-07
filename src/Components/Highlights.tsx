import { useState } from 'react';
import * as THREE from 'three';
import MeshBlock from './MeshBlock';
import { meshBlockLocation } from './LocationInfo';

export const Highlights = () => {
    const [selection, setSelection] = useState(-1);
    return (
        <>
        {
          meshBlockLocation.map((block, index) => {
            return (
              <mesh
                key={index}
                onPointerOver={ () => {
                  block.id !== selection && setSelection(block.id);
                  document.body.style.cursor='pointer'; 
                } }
                onPointerLeave={() => {
                  setSelection(-1);
                  document.body.style.cursor='auto';
                } }
                position={new THREE.Vector3(block.position[0]-192, 127.5-block.position[1], -1)}
                material={new THREE.MeshStandardMaterial({ color: 0 })}
                >
                  <planeGeometry args={[block.area[0], block.area[1]]}/>
              </mesh>
            );
          })
        }
        {
          meshBlockLocation.map((block, index) => {
              return <MeshBlock key={index} position={[block.position[0]-192, 127.5-block.position[1], 5]}
                type={block.name} size={block.size} flag={block.flag}
                mouseHoverFlag={block.id === selection}/>
          })
        }
        </>
    );
}