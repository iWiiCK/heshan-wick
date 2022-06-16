import React, { useState, useEffect, useRef, Suspense } from "react";
import { ScrollControls, Scroll, useProgress, Html, Text, Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { isMobile } from "react-device-detect";

import CommonSection from "../common/CommonSection";

import GeometryGuy from "../../blendComponents/GeometryGuy";
import PlantAndLamp from "../../blendComponents/PlantAndLamp";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";

const Scene = ({ canvasRef }) => {
    const { height } = useWindowDimensions();
    const pageSpacing = -height / 130;
    const mesh = useRef();
    const [scrollDown, setScrollDown] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const numOfPages = 3
    const scrollCursorSpeed = 0.05
    const scrollBottomBound = numOfPages * pageSpacing * -0.7
    

    const Loader = () => {
        const { progress } = useProgress();
        return (
            <Html center style={{ textAlign: "center" }}>
                <div >
                    <h3 style={{ width: 200 }}>{`Loading... ${progress}%`}</h3>
                    <h5 style={{ width: 200 }}>{`Awesomeness can take a bit of time loading for the first time :)`}</h5>
                </div>
            </Html >
        );
    }

    const renderScrollCursors = () => {
        return (
            <Billboard>
                <mesh onPointerEnter={() => { setScrollDown(true) }} onPointerOut={() => { setScrollDown(false) }} position={[0, pageSpacing / 2, 0]} scale={0.5}>
                    <Text color="white" fontSize={0.2} fillOpacity={1} anchorY={"bottom"} maxWidth={1.5} textAlign="center">
                        Swipe Down Here
                    </Text>
                    <Text color="white" fontSize={1.2} fillOpacity={0.2} anchorY={"bottom"} position={[0, -0.5, 0]}>
                        V
                    </Text>
                </mesh>

                <mesh onPointerEnter={() => { setScrollUp(true) }} onPointerOut={() => { setScrollUp(false) }} position={[0, -pageSpacing / 2.1, 0]} scale={0.5}>
                    <Text color="white" fontSize={0.2} fillOpacity={1} anchorY={"bottom"} maxWidth={1.5} textAlign="center">
                        Swipe Down Here
                    </Text>
                    <Text color="white" fontSize={1.2} fillOpacity={0.2} anchorY={"bottom"} position={[0, 1, 0]} rotation={[0, 0, Math.PI]}>
                        V
                    </Text>
                </mesh>
            </Billboard>
        );
    }

    useFrame(({ camera }) => {
        if (scrollDown && mesh.current?.position.y < scrollBottomBound)
            mesh.current.position.y += scrollCursorSpeed
        else if (scrollUp && mesh.current?.position.y > 0)
            mesh.current.position.y -= scrollCursorSpeed

        // console.log(mesh.current?.position.y);
        // console.log(isMobile);
        // console.log(scrollBottomBound);
    });


    return (
        <Suspense fallback={<Loader />}>
            <mesh ref={mesh}>
                <ScrollControls
                    pages={isMobile ? 1 : numOfPages}
                    distance={1}
                    damping={6}
                    horizontal={false}
                    infinite={false}
                >
                    <Scroll>
                        <CommonSection
                            position={[0, 0, 0]}
                            title="Hello World!"
                            description="I'm Heshan"
                            sectionWidth={5}
                            id="section1"
                        />

                        <CommonSection
                            position={[0, pageSpacing * 1, 0]}
                            title="I Love to Create"
                            description="3D Art and Software"
                            threeJSModelTop={<GeometryGuy scale={2} position={[0, 4, 0]} rotation={[0, 0, Math.PI]} />}
                            threeJSModelBottom={<GeometryGuy scale={2} position={[0, -4.2, 0]} rotation={[0, Math.PI, -Math.PI * 2]} />}
                            id="section2"
                        />

                        <CommonSection
                            position={[0, pageSpacing * 2, 0]}
                            title="Where Magic Happens"
                            description="Well... Almost :)"
                            threeJSModelBottom={<PlantAndLamp scale={3} position={[0, -3, 0]} />}
                            id="section3"
                        />
                    </Scroll>
                </ScrollControls>
            </mesh>
            {isMobile ? renderScrollCursors() : null}
        </Suspense>
    );
};

export default Scene;
