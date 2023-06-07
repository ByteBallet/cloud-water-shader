import { Canvas } from '@react-three/fiber';
import { Controls } from './Components/CameraControls';
import { CustomShaderMaterial } from './Components/SparkleSpot';
import { BasicBack } from './Components/Basic';
import { ZoomInClouds } from './Components/ZoomInClouds';
import { BackgroundClouds } from './Components/BackgroundClouds';
import { Highlights } from './Components/Highlights';
import { Ocean } from './Components/water';
// import { SparkleLight } from './Components/Object/Light.js';

function App() {
  return (
    <div>
      <Canvas camera={{ fov: 75}}>
        {/* <pointLight position={[0, 0, 150]} /> */}
        
        {/* <ambientLight intensity={1}/> */}
        <directionalLight color={0xffffff} intensity={1} position={[0, 0, 150]}/>

        <ZoomInClouds />
        <BasicBack />
        <BackgroundClouds />
        <Highlights />

        <CustomShaderMaterial position={[0,0,1]}/>
        <Ocean />

        {/* <SparkleLight /> */}

        <Controls dampingFactor={0.5}/>
      </Canvas>
    </div>
  );
}
export default App;