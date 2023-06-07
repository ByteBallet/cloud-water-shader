import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Island = () => {
    const material = new THREE.MeshBasicMaterial({
        map: null,
        color: 0xffffff,
        transparent: true,
        opacity: 1
    });

    const textureUrl = 'ISLAND_2.png';
    const textureLoader = new THREE.TextureLoader();

    useEffect(() => {
        textureLoader.load(textureUrl, (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
            material.map = texture;
            material.needsUpdate = true;
        });
    }, [textureLoader, textureUrl]);

    return (
        <mesh position={[0, 0, 2]} scale={[1, 1, 1]} material={material}>
            <planeGeometry args={[384, 255]} />
        </mesh>
    );
};