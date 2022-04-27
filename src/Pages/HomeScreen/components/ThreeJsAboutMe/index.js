import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Sparkles, Text, OrbitControls } from '@react-three/drei'
import theme from '../../../../styles/theme'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'

const ThreeJsAboutMe = () => {
    const titleRef = useRef();
    const { width } = useWindowDimensions();
    const [titleFontSize, setTitleFontSize] = useState(0.5)
    const title = "Hello World!"
    const description =
        `I'm a 3rd year Software Engineering Undergraduate`;

    useEffect(() => {
        if (width < 300) setTitleFontSize(0.3)
        else if (width < 450) {
            setTitleFontSize(0.4)
        }
        else {
            setTitleFontSize(0.5)
        }
    }, [width]);

    return (
        <Canvas style={{ height: 600 }} >
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

                {/* Description and Title 1 */}
                <Text ref={titleRef} color="white" fontSize={titleFontSize} position={[0, 0, 2]}>
                    {title}
                </Text>
                <Text color="white" fontSize={titleFontSize * 0.4} position={[0, -0.5, 2]} textAlign="center" maxWidth={titleFontSize * 5} >
                    {description}
                </Text>
            </Physics>
        </Canvas>
    )
}

export default ThreeJsAboutMe