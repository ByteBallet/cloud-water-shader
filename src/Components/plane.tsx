import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Plane = ({ position }: { position: THREE.Vector3 }) => {
    const imageFile = 'plane.png';
    const frameCount = 1;
    const [frameOffset, setFrameOffset] = useState(0);
    const meshRef = useRef<THREE.Mesh>(null);
    const textureMat = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(imageFile);
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = 1 / frameCount;
        texture.offset.setX(frameOffset / 1);

        const material_one = new THREE.MeshPhongMaterial();
        material_one.map = texture;
        material_one.transparent = true;
        return material_one;
    }, [frameOffset]);

    useFrame((state, delta) => {
        meshRef.current!.position.x += 5 * delta;
        meshRef.current!.position.z -= 4 * delta;
        meshRef.current!.castShadow = true;
        
        setFrameOffset(off => (off + 1) % frameCount)
    });

    return (
        <mesh castShadow ref={meshRef} position={position} scale={[1, 1, 1]} rotation={[-Math.PI / 2, 0, -0.8]} material={textureMat}>
            <planeGeometry args={[3, 3]} />
        </mesh>
    );
};


// 
