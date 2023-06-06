import { Canvas } from '@react-three/fiber';
import { Controls } from './Components/CameraControls';
import { CustomShaderMaterial } from './Components/water';
import { BasicBack } from './Components/Basic';
import { ZoomInClouds } from './Components/ZoomInClouds';
import { BackgroundClouds } from './Components/BackgroundClouds';
import { Highlights } from './Components/Highlights';


function App() {
  return (
    <div>
      <Canvas camera={{ fov: 75}}>
        <pointLight position={[0, 0, 150]} />
        
        {/* <ambientLight intensity={1}/> */}
        {/* <directionalLight color={0xffffff} intensity={0.6} position={[0, 0, 120]}/> */}

        <ZoomInClouds />
        <BasicBack />
        <BackgroundClouds />
        <Highlights />

        {/* <CustomShaderMaterial position={[0,0,1]}/> */}
        
        <Controls dampingFactor={0.5}/>
      </Canvas>
    </div>
  );
}
export default App;