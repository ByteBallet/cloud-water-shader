import { useLoader, useFrame, Object3DNode } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from 'three/examples/jsm/objects/Water.js';
  
export const Ocean = () => {
    const ref = useRef<Water>(null);
    const waterNormals = useLoader( THREE.TextureLoader, 'waternormals.png' );

    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(512, 512), []);
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(0, 1.5, 0),
            sunColor: 0xffffff,
            waterColor: 0x10ffff,
            distortionScale: 40,
            fog: false,
        }),
        [waterNormals]
    );
    useFrame((state, delta) => {
        const material = ref?.current?.material as THREE.ShaderMaterial;
        // material.uniforms
        material.uniforms['time'].value += delta/8;
    });

    return (
        <water
            ref={ref}
            args={[geom, config]}
            rotation-x={-Math.PI / 2}
            rotation-z={-Math.PI / 6}
            position={[0, 1, 0]}
        />
    );
    };

    extend({ Water });

    declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
        interface IntrinsicElements {
            water: Object3DNode<Water, typeof Water>;
        }
    }
}