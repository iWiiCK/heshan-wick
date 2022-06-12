import React, { useEffect, useRef, useState } from 'react'
import { Text, Billboard, Circle } from '@react-three/drei'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'
import ColorUniverseWrapper from '../common/ColorUniverseWrapper'
import GeometryGuy from './GeometryGuy'

const ILikeToCreate = ({ position }) => {
    const titleRef = useRef();
    const { width } = useWindowDimensions();
    const [titleFontSize, setTitleFontSize] = useState(0.5)
    const title = "I Love to Create"
    const description =
        `3D Art and Software`;

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
        <ColorUniverseWrapper position={position} >
            <GeometryGuy scale={2} position={[0, 4, 0]} rotation={[0, 0, Math.PI]} />
            <Billboard>
                <Text ref={titleRef} color="white" fontSize={titleFontSize} position={[0, 0, 2]}>
                    {title}
                </Text>
                <Text color="white" fontSize={titleFontSize * 0.4} position={[0, -titleFontSize, 2]} textAlign="center" maxWidth={titleFontSize * 5} >
                    {description}
                </Text>
            </Billboard>
            <GeometryGuy scale={2} position={[0, -4.2, 0]} rotation={[0, Math.PI, -Math.PI * 2]}/>
        </ColorUniverseWrapper>
    )
}

export default ILikeToCreate
