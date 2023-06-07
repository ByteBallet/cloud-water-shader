import React, { useEffect } from 'react';
import * as THREE from 'three';
import { Plane } from './plane';
import { planeLocation, planeShadowLocation } from './LocationInfo';
import { Island } from './Island';

export const BasicBack = React.memo(() => {
    const material = new THREE.MeshBasicMaterial({
        map: null,
        color: 0xffffff,
        transparent: true,
        opacity: 1
    });

    const textureUrl = 'ISLAND_1.png';
    const textureLoader = new THREE.TextureLoader();
    
    useEffect(() => {
        textureLoader.load(textureUrl, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            material.needsUpdate = true;
        });
    }, [textureLoader, textureUrl]);
    
    return (
      <>
        <mesh position={[0, 0, 0]} material={material}>
            <planeGeometry args={[384, 255]} />
        </mesh>
        <Island />

        <Plane position={new THREE.Vector3(planeLocation.x, planeLocation.y, planeLocation.z)} shadow={false}/>
        <Plane position={new THREE.Vector3(planeShadowLocation.x, planeShadowLocation.y, planeShadowLocation.z)} shadow={true}/>
      </>
    );
}, () => true);