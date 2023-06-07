import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Reflector } from "./Light.js";

export const Ocean = () => {
  const { scene } = useThree();
  const waterRef = useRef();

  useEffect(() => {
    const waterGeometry = new THREE.PlaneGeometry(384, 255);
    const water = new Reflector(waterGeometry, {
        textureWidth: 1024,
        textureHeight: 1024,
        clipBias: 0,
        iResolution: new THREE.Vector2(50,30),
        itime: 0,
    });

    water.position.z = 1;

    waterRef.current = water;
    scene.add(water);

    // Cleanup
    return () => {
      scene.remove(water);
    };
  }, []);
  
  useFrame((_state, delta) => {
    if (waterRef.current) {
      const waterMaterial = waterRef.current.material;
      waterMaterial.uniforms.iTime.value += delta*2;
    }
  });

  return null; // or any other React Three.js components you want to render alongside the water
};