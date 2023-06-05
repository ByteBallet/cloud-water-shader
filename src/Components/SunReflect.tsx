const reflectPos = [
    {
        position: [ 0, 3, 0 ],
        maxSize: [4,3],
        minSize: [-3,-2],
        direction: 1,
        currentSize: [-3, -2],
    },
];

// function ReflectItem({ reflectItem }: any) {
//     const [position, setPosition] = useState(initialPosition);
//     const [opacity, setOpacity] = useState(1);
  
//     useFrame((state, delta) => {
//       setPosition((prevPosition:any) => [
//         prevPosition[0] + mx* 0.02,
//         prevPosition[1] + delta * 10,
//         prevPosition[2] + mz* 0.02,
//       ]);
//       setOpacity((prevOpacity:any) => prevOpacity - 0.3 * delta);
//     });
  
//     return <Cloud position={position} speed={0.5} opacity={opacity} scale={[5, 2, 5]} segments={5}/>;
//   }

export const SunReflect = () => {
    return (
        <>
        {
            // reflectPos.map((item: any) => {
                // <ReflectItem reflectItem={item} />
            // })
        }
        </>
    );
};


// 
