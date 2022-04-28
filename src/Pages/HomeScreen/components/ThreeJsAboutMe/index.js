import React, { useEffect, useRef, useState } from 'react'
import { Physics } from '@react-three/cannon'
import { Sparkles, Text, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import theme from '../../../../styles/theme'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'

const ThreeJsAboutMe = () => {
    const mesh = useRef()
    const titleRef = useRef();
    const { width, height } = useWindowDimensions();
    const [titleFontSize, setTitleFontSize] = useState(0.5)
    const title = "Hello World!"
    const description =
        `I'm a 3rd year Software Engineering Undergraduate`;

    useEffect(() => {
        if (width < 350) setTitleFontSize(0.2)
        else if (width < 500) {
            setTitleFontSize(0.3)
        }
        else {
            setTitleFontSize(0.4)
        }
    }, [width]);

    return (
        <mesh style={{ height: '100vh' }} ref={mesh} position={[0, -height/120, 0]}>
            <Physics>
                <OrbitControls
                    enablePan={false}
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
                <ambientLight />
                <pointLight position={[0, 800, 50]} intensity={100} color={"white"} />
                <Sparkles scale={10} size={3} position={[0, -2, 0]} noise={3} />
                <Sparkles scale={30} size={400} position={[0, 2, -3]} color={theme.backgroundGreen} count={5} />
                <Sparkles scale={30} size={400} position={[0, 2, -3]} color={"blue"} count={5} />

                <Text ref={titleRef} color="white" fontSize={titleFontSize} position={[0, 0, 2]}>
                    {title}
                </Text>
                <Text color="white" fontSize={titleFontSize * 0.4} position={[0, -titleFontSize, 2]} textAlign="center" maxWidth={titleFontSize * 5} >
                    {description}
                </Text>
            </Physics>
        </mesh>
    )
}

export default ThreeJsAboutMe