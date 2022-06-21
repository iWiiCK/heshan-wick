import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import geoHands from "../../../../assets/GeoHands.glb";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(geoHands);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials["Material.001"]}
        position={[-0.07, 0.29, -0.12]}
        scale={0.05}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.HandR002.geometry}
        material={materials["Material.003"]}
        position={[0.08, 0.05, 0]}
        rotation={[1.28, 1.38, -1.29]}
        scale={[1.27, 1.27, 1.27]}
      />
    </group>
  );
}

useGLTF.preload(geoHands);

