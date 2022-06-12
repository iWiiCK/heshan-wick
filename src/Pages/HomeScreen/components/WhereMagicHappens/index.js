import React, { useEffect, useRef, useState } from 'react'
import { Text, Billboard, Circle } from '@react-three/drei'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'
import ColorUniverseWrapper from '../common/ColorUniverseWrapper'
import GeometryGuy from './PlantAndLamp'

const WhereMagicHappens = ({ position }) => {
    const titleRef = useRef();
    const { width } = useWindowDimensions();
    const [titleFontSize, setTitleFontSize] = useState(0.5)
    const title = "Where Magic Happens"
    const description =
        `Well... Almost`;

    useEffect(() => {
        if (width < 450) setTitleFontSize(0.2)
        else if (width < 700) {
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
            <GeometryGuy scale={3} position={[0, -3, 0]}/>
        </ColorUniverseWrapper>
    )
}

export default WhereMagicHappens
