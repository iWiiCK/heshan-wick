import React, { useRef } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import plantAndLampBlend from "../../../../assets/plantAndLampBlend.glb";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(plantAndLampBlend);
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <pointLight
          name="Light"
          intensity={200}
          decay={2}
          position={[4.08, 5.9, -1.01]}
          rotation={[-1.84, 0.6, 1.93]}
        />
        <PerspectiveCamera
          name="Camera"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={22.9}
          position={[0.83, 0.12, -0.57]}
          rotation={[-3.14, 0.36, 3.13]}
        />
        <spotLight
          name="Spot"
          angle={0.93}
          penumbra={0.15}
          decay={2}
          color="#e7ffb6"
          position={[0.61, 0.52, -0.01]}
          rotation={[-1.05, 0.32, -0.22]}
          scale={[1.48, 1.48, 1.48]}
        >
          <group position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          name="Spot002"
          intensity={300}
          angle={0.29}
          penumbra={0.15}
          decay={2}
          color="#ff9971"
          position={[-0.88, 2.33, 4.08]}
          rotation={[-0.5, -0.15, -0.21]}
          scale={[1.48, 1.48, 1.48]}
        >
          <group position={[0, 0, -1]} />
        </spotLight>
        <spotLight
          name="Spot001"
          intensity={10}
          angle={0.93}
          penumbra={0.15}
          decay={2}
          color="#e7ffb6"
          position={[0.61, 0.52, -0.01]}
          rotation={[-1.05, 0.32, -0.22]}
          scale={[0.11, 0.11, 0.11]}
        >
          <group position={[0, 0, -1]} />
        </spotLight>
        <mesh
          name="Screen"
          castShadow
          receiveShadow
          geometry={nodes.Screen.geometry}
          material={materials.Material}
          position={[0, 0.37, 0.38]}
          rotation={[-1.23, 0, -Math.PI]}
          scale={[-0.49, -0.02, -0.31]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(plantAndLampBlend);