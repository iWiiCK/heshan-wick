import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, usePlane } from '@react-three/cannon'
import { Plane, Sparkles } from '@react-three/drei'

const ThreeJsAboutMe = () => {

    const PlaneMesh = (props) => {
        const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2.5, 0, 0], ...props }))
        return (
            <mesh ref={ref} position={[0, -6, 0]}>
                <Plane args={[100, 10]}>
                    <meshStandardMaterial
                        color={"#3b3b3b"}
                        metalness={1}
                        roughness={0.15}
                        envMapIntensity={0.9}
                    />
                </Plane>
            </mesh>
        )
    }

    return (
        <Canvas style={{ height: 600 }}>
            <Physics>
                <ambientLight />
                <pointLight position={[0, 800, 100]} intensity={100} color={"white"} />
                <PlaneMesh />
                <Sparkles scale={10} size={3} position={ [0,-2, 0]}/>
            </Physics>
        </Canvas>
    )
}

export default ThreeJsAboutMe