import React, { useRef } from 'react'
import { Sparkles, OrbitControls } from '@react-three/drei'
import theme from '../../../../../styles/theme'

const ColorUniverseWrapper = ({ children, position = [0, 0, 0], color1 = theme.backgroundGreen, color2 = "blue", visible = true }) => {
    const mesh = useRef()

    return (
        <mesh ref={mesh} position={position} visible={visible}>
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
            />
            <ambientLight />
            <pointLight position={[0, 800, 50]} intensity={100} color={"white"} />
            <Sparkles scale={10} size={3} position={[0, -2, 0]} noise={3} />
            <Sparkles scale={30} size={400} position={[0, -2, -3]} color={color1} count={2} />
            <Sparkles scale={30} size={400} position={[0, 2, -3]} color={color2} count={2} />
            {children}
        </mesh>
    )
}

export default ColorUniverseWrapper;