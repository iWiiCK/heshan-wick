import React, { useState, useRef, Suspense, useEffect } from "react";
import { ScrollControls, Scroll, useProgress, Html, Text, Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { isMobile } from "react-device-detect";

import CommonSection from "../common/CommonSection";

import GeometryGuy from "../../blendComponents/GeometryGuy";
import PlantAndLamp from "../../blendComponents/PlantAndLamp";

import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import GeoHands from "../../blendComponents/GeoHands";

const Scene = ({ setAboutMeVisible, aboutMeVisible }) => {
    const { height } = useWindowDimensions();
    const pageSpacing = -height / 130;
    const mesh = useRef();
    const [scrollDown, setScrollDown] = useState(false);
    const [scrollUp, setScrollUp] = useState(false);
    const numOfPages = 4
    const scrollCursorSpeed = 0.05
    const scrollBottomBound = numOfPages * pageSpacing * -0.7
    const aboutMeVisibleOffset = -0.5


    const Loader = () => {
        const { progress } = useProgress();

        useEffect(() => {
            return () => setAboutMeVisible(true)
        }, []);

        return (
            <Html center style={{ textAlign: "center" }}>
                <div>
                    <h3 style={{ width: 200 }}>{`Loading... ${Math.trunc(progress)}%`}</h3>
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

    useFrame(({ camera, clock }) => {
        if (scrollDown && mesh.current?.position.y < scrollBottomBound)
            mesh.current.position.y += scrollCursorSpeed
        else if (scrollUp && mesh.current?.position.y > 0)
            mesh.current.position.y -= scrollCursorSpeed

        if (mesh.current) {
            mesh.current.position.z += Math.sin(clock.elapsedTime) * 0.002
        }
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
                            hints="Click & Drag for 360 View"
                        />

                        <CommonSection
                            position={[0, pageSpacing * 1, 0]}
                            title="I Love to Create"
                            description="3D Art and Software"
                            threeJSModelTop={<GeometryGuy scale={2} position={[0, 5, 0]} rotation={[0, 0, Math.PI]} />}
                            threeJSModelBottom={<GeometryGuy scale={2} position={[0, -5.5, 0]} rotation={[0, Math.PI, -Math.PI * 2]} />}
                        />

                        <CommonSection
                            position={[0, pageSpacing * 2, 0]}
                            title="Where Magic Happens"
                            description="Well... Almost :)"
                            threeJSModelBottom={<PlantAndLamp scale={2.5} position={[0, -2.5, 0]} />}
                        />

                        <CommonSection
                            position={[0, pageSpacing * 3, 0]}
                            title="Let's Connect"
                            description="Getting to know folks is amazing :)"
                            threeJSModelBottom={<GeoHands scale={4} position={[0, -2, 0]} />}
                        />
                    </Scroll>
                </ScrollControls>
            </mesh>
            {isMobile ? renderScrollCursors() : null}
        </Suspense>
    );
};

export default Scene;
