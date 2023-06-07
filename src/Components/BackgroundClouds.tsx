import { useState } from 'react';
import { Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { backCloudPosition, fixedClouds } from './LocationInfo';

function BackCloud({ cloud }: any) {
    const [pos, setPosition] = useState(cloud.position);

    useFrame(() => {
      setPosition((prevPosition:any) => {
        if(prevPosition[0] < -220 || prevPosition[1] > 150){
          prevPosition[0] = cloud.initialPos[0];
          prevPosition[1] = cloud.initialPos[1];
        }
        return [
          prevPosition[0] - 0.05,
          prevPosition[1] + 0.05,
          prevPosition[2],
        ]
      });
    });
  
    return <Cloud position={pos} opacity={cloud.opacity} speed={0} scale={cloud.scale} depth={1}/>;
}

export const BackgroundClouds = () => {
    return (
        <>
        {
          backCloudPosition.map((cloud, index) => {
            return <BackCloud key={index} cloud={cloud} />;
          })
        }
        {
          fixedClouds.map((cloud, index) => {
            return <Cloud key={index} position={cloud.position} scale={cloud.scale} opacity={cloud.opacity} speed={0} />
          })
        }
        </>
    );
}