import { Canvas } from '@react-three/fiber';
import { Controls } from './Components/CameraControls';
import { BasicBack } from './Components/Basic';
import { ZoomInClouds } from './Components/ZoomInClouds';
import { BackgroundClouds } from './Components/BackgroundClouds';
import { Highlights } from './Components/Highlights';
import { Ocean } from './Components/Water';

function App() {
  return (
    <div>
      <Canvas camera={{ fov: 75}}>
        <directionalLight color={0xffffff} intensity={1} position={[0, 0, 150]}/>
        <ZoomInClouds />
        <BasicBack />
        <BackgroundClouds />
        <Highlights />
        <Ocean />
        <Controls dampingFactor={0.5}/>
      </Canvas>
    </div>
  );
}
export default App;