import React, { useEffect, useRef, useState } from 'react'
import { Text, Billboard } from '@react-three/drei'
import useWindowDimensions from '../../../../../hooks/useWindowDimensions'
import ColorUniverseWrapper from '../ColorUniverseWrapper'


const CommonSection = ({
    position,
    title,
    description,
    sectionWidth = 6,
    threeJSModelTop,
    threeJSModelBottom,
    hints,
}) => {
    const titleRef = useRef();
    const { width } = useWindowDimensions();
    const [titleFontSize, setTitleFontSize] = useState(0.5)

    useEffect(() => {
        if (width < 350) setTitleFontSize(0.2)
        else if (width < 700) {
            setTitleFontSize(0.3)
        }
        else {
            setTitleFontSize(0.4)
        }
    }, [width]);

    return (
        <ColorUniverseWrapper position={position}>
            {threeJSModelTop}
            <Billboard>
                <Text ref={titleRef} color="white" fontSize={titleFontSize} position={[0, 0, 2]} textAlign="center" lineHeight={0.8} maxWidth={titleFontSize * sectionWidth}>
                    {title}
                </Text>
                <Text color="white" fontSize={titleFontSize * 0.4} position={[0, -titleFontSize - 0.1, 2]} textAlign="center" maxWidth={titleFontSize * (sectionWidth - 1)} >
                    {description}
                </Text>
                <Text color="white" fontSize={titleFontSize * 0.2} position={[0, -titleFontSize * 2 - 0.1, 2]} textAlign="center" maxWidth={titleFontSize * (sectionWidth - 1)} fillOpacity={0.7}>
                    {hints}
                </Text>
            </Billboard>
            {threeJSModelBottom}
        </ColorUniverseWrapper>
    )
}

export default CommonSection