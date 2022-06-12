import React, { useEffect, useRef, useState } from 'react'
import { Text, Billboard, Circle } from '@react-three/drei'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'
import ColorUniverseWrapper from '../common/ColorUniverseWrapper'

const ThreeJsAboutMe = ({ position }) => {
    const titleRef = useRef();
    const { width } = useWindowDimensions();
    const [titleFontSize, setTitleFontSize] = useState(0.5)
    const title = "Hello World!"
    const description =
        `I'm Heshan :D`;

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
        <ColorUniverseWrapper position={position}>
            <Billboard>
                <Text ref={titleRef} color="white" fontSize={titleFontSize} position={[0, 0, 2]}>
                    {title}
                </Text>
                <Text color="white" fontSize={titleFontSize * 0.4} position={[0, -titleFontSize, 2]} textAlign="center" maxWidth={titleFontSize * 5} >
                    {description}
                </Text>
            </Billboard>
        </ColorUniverseWrapper>
    )
}

export default ThreeJsAboutMe