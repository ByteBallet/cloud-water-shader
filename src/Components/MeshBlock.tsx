import * as THREE from 'three';
import { useMemo } from 'react';

function MeshBlock({type, position, size, flag, mouseHoverFlag} : {type: any, position: any, size: any, flag: any,mouseHoverFlag: any}) {
    
    const textureMat = useMemo(() => {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(type + (mouseHoverFlag ? '-hover.png' : '.png'));
        const material_one = new THREE.MeshPhongMaterial();
        material_one.map = texture;
        material_one.transparent = true;
        return material_one;
    }, [mouseHoverFlag]);

    return (
        <mesh 
            position={[position[0] + flag[0] * size[0]/2, position[1] - flag[1] * size[1] /2, position[2]]} 
            material={textureMat}
        >
            <planeGeometry args={size}/>
        </mesh>
    );
}

export default MeshBlock;