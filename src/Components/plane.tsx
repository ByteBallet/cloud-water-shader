import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Plane = ({ position, shadow }: { position: THREE.Vector3, shadow: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const textureMat = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const texture = loader.load( shadow ? 'plane_shadow.png' : 'plane.png');
        texture.colorSpace = THREE.SRGBColorSpace;

        const material_one = new THREE.MeshPhongMaterial();
        material_one.map = texture;
        material_one.transparent = true;
        material_one.opacity = shadow ? 0.3: 1;
        return material_one;
    }, []);

    useFrame((_state, delta) => {
        meshRef.current!.position.x += 5 * delta;
        meshRef.current!.position.y += 3 * delta;
        meshRef.current!.castShadow = true;

        if(meshRef.current!.position.x > 200 || meshRef.current!.position.y > 130) {
            meshRef.current!.position.x = -120 + Math.random() % 50;
            meshRef.current!.position.y = -120 + Math.random() % 10;
        }
    });

    return (
        <mesh ref={meshRef} position={position} scale={[2, 2, 1]} rotation={[ 0, 0, -0.8]} material={textureMat}>
            <planeGeometry args={shadow ? [4, 4] : [8, 8]} />
        </mesh>
    );
};