import { useState } from 'react';
import { Cloud } from '@react-three/drei';
import { cloudLocation } from './LocationInfo';
import { useFrame } from '@react-three/fiber';

function MovingCloud({ initialPosition, mx, mz }: any) {
    const [position, setPosition] = useState(initialPosition);
    // const [opacity, setOpacity] = useState(1);
  
    useFrame((_state, delta) => {
      setPosition((prevPosition:any) => [
        prevPosition[0] + mx*0.3,
        prevPosition[1] + mz*0.3,
        prevPosition[2] + delta*10,
      ]);
      // setOpacity((prevOpacity:any) => prevOpacity - 0.1 * delta);
    });
  
    return <Cloud position={position} opacity={1} scale={[13, 10, 1]} segments={10} depth={10} width={1}/>;
}

export const ZoomInClouds = () => {
    return (
        <>
        {
            cloudLocation.map((cloud) => {
                return <MovingCloud initialPosition={cloud.position} mx={cloud.mx} mz={cloud.mz} />;
            })
        }
        </>
    );
}