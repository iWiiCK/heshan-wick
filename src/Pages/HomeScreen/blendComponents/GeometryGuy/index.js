import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

const GeometryGuy = ({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
    const mesh = useRef()
    let meshXPos;

    useFrame(({ clock }) => {
        meshXPos = mesh.current.position.x;
        mesh.current.rotation.y += 0.005
    })

    return (
        <mesh ref={mesh} scale={scale} position={position} rotation={rotation} >
            <Model />
        </mesh>
    )
}

export default GeometryGuy;