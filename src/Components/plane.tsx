import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Plane = ({ position, shadow }: { position: THREE.Vector3, shadow: boolean }) => {
    const frameCount = 1;
    const [frameOffset, setFrameOffset] = useState(0);
    const meshRef = useRef<THREE.Mesh>(null);
    const textureMat = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const texture = loader.load( shadow ? 'plane_shadow.png' : 'plane.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.repeat.x = 1 / frameCount;
        texture.offset.setX(frameOffset / 1);

        const material_one = new THREE.MeshPhongMaterial();
        material_one.map = texture;
        material_one.transparent = true;
        material_one.opacity = shadow ? 0.3: 1;
        return material_one;
    }, [frameOffset]);

    useFrame((state, delta) => {
        meshRef.current!.position.x += 5 * delta;
        meshRef.current!.position.z -= 3 * delta;
        meshRef.current!.castShadow = true;

        if(meshRef.current!.position.x > 130 || meshRef.current!.position.z < -60) {
            meshRef.current!.position.x = -80 + Math.random() % 50;
            meshRef.current!.position.z = 80 + Math.random() % 10;
        }
        
        setFrameOffset(off => (off + 1) % frameCount)
    });

    return (
        <mesh castShadow ref={meshRef} position={position} scale={[1, 1, 1]} rotation={[-Math.PI / 2, 0, -0.8]} material={textureMat}>
            <planeGeometry args={shadow ? [5, 5] : [10, 10]} />
        </mesh>
    );
};


// 
