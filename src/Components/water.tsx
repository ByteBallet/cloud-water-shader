import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SparkleLight } from "./Object/Light.js";

export const Ocean = () => {
  const { scene } = useThree();

  const params = {
    color: "#ffffff",
    scale: 2,
    flowX: 0.1,
    flowY: -0.1,
  };

  useEffect(() => {
    const waterGeometry = new THREE.PlaneGeometry(384, 255);
    const water = new SparkleLight(waterGeometry, {
        textureWidth: 1024,
        textureHeight: 1024,
        clipBias: 0,
        iResolution: new THREE.Vector2(500,300),
    });

    water.position.z = 1;

    scene.add(water);

    // Cleanup
    return () => {
      scene.remove(water);
    };
  }, []);

  return null; // or any other React Three.js components you want to render alongside the water
};