import CameraControls from 'camera-controls';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { extend, useThree, useFrame } from '@react-three/fiber';

CameraControls.install({ THREE })
extend({ CameraControls })

export const Controls = (props: any) => {
    const ref = useRef();
    const camera = useThree((state: any) => state.camera);
    const gl = useThree((state: any) => state.gl);
    useFrame((_state, delta) => ref.current.update(delta));

    useEffect(() => {
        const controls = ref.current;
        const handleEvent = (event: any) => {
            const target = event.target;
            const h = 2 * Math.tan(camera.fov * Math.PI / 360) * target.distance;
            const w = h * camera.aspect;
            const minBound = new THREE.Vector3(-(384-w)/2, -(255-h)/2, 0);
            const maxBound = new THREE.Vector3((384-w)/2, (255-h)/2, 0);
        
            const boundary = new THREE.Box3( minBound, maxBound );
            controls.setBoundary(boundary);
        }
        controls.addEventListener('control', handleEvent);
        
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            if( width < height ) {
                controls.maxDistance = 160;
                controls.distance = 160;
                controls.minDistance = 100;
            } else {
                controls.maxDistance = 100;
                controls.distance = 100;
                controls.minDistance = 70;
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    // const aspect = gl.domElemnt.clientWidth/gl.domElement.clientHeight;

    return <cameraControls
        ref={ref} 
        args={[camera, gl.domElement]}
        minDistance={70}
        maxDistance={100}
        distance={100}
        {...props} 
        dollyToCursor={true}
        dollySpeed={0.5}
        mouseButtons={{
            left: CameraControls.ACTION.TRUCK,
            wheel: CameraControls.ACTION.DOLLY,
        }}
        touches={{
            one: CameraControls.ACTION.TRUCK,
        }}
        boundaryEnclosesCamera={false}
    />;
}