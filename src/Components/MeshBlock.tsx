import { Html } from '@react-three/drei';

function MeshBlock({type, position} : {type: any, position: any}) {
    return (<Html position={position}>
        <div
            style={{
                fontSize: '20px',
                textAlign: 'center',
                fontFamily: 'Impact',
                color: 'white',
                border: '3px solid',
                width: '100%',
                borderRadius: '10px',
                borderColor: 'white',
                padding: '5px 5px 5px 5px',
                whiteSpace: 'nowrap',
            }}
        >
            {type}
        </div>
    </Html>);
}

export default MeshBlock;