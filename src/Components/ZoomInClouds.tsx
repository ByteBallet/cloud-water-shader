import { useState } from 'react';
import { Cloud } from '@react-three/drei';
import { cloudLocation } from './LocationInfo';
import { useFrame } from '@react-three/fiber';

function MovingCloud({ initialPosition, mx, mz }: any) {
    const [position, setPosition] = useState(initialPosition);
    
    useFrame((_state, delta) => {
      setPosition((prevPosition:any) => [
        prevPosition[0] + mx * 0.3,
        prevPosition[1] + mz * 0.3,
        prevPosition[2] + delta * 10,
      ]);
    });
  
    return <Cloud position={position} opacity={1} scale={[13, 10, 1]} segments={10} depth={10} width={1}/>;
}

export const ZoomInClouds = () => {
    return (
        <>
        {
            cloudLocation.map((cloud, index) => {
                return <MovingCloud key={index} initialPosition={cloud.position} mx={cloud.mx} mz={cloud.mz} />;
            })
        }
        </>
    );
}