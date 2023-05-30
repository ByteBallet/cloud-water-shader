import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export const Islands = ({ position }: { position: THREE.Vector3 }) => {
    const imageFile = 'Islands.png';
    const meshRef = useRef<THREE.Mesh>(null);
    const textureMat = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(imageFile);
        const material_one = new THREE.MeshPhongMaterial();
        material_one.map = texture;
        material_one.transparent = true;
        return material_one;
    }, []);
    return (
        <mesh ref={meshRef} position={position} rotation={[-Math.PI / 2, 0, 0]} material={textureMat}>
            <planeGeometry args={[240, 135]} />
        </mesh>
    );
};


// 
