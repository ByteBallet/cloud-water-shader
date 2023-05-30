import { Html } from '@react-three/drei';

function MeshBlock({type, position} : {type: any, position: any}) {
    return (<Html position={position}>
        <div
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontSize: '15px',
                color: 'white',
                background: 'rgba(0, 0, 0, 0.5)',
                border: '10px',
                borderRadius: '5px',
                padding: '10px 10px 10px 10px',
            }}
        >
            {type}
        </div>
    </Html>);
}

export default MeshBlock;