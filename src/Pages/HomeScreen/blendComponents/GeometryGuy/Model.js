import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import geometryGuy from "../../../../assets/geometryGuy.glb";

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF(geometryGuy);
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 0.7, 0.41]} rotation={[-0.77, 0, 0]}>
        <group position={[0, 1.01, -0.06]} rotation={[0.25, 0, 0]}>
          <group position={[0, 0.15, 0]} rotation={[-0.13, 0, 0]}>
            <group position={[0, 0.14, 0]} rotation={[-0.69, 0, 0]}>
              <group position={[0, 0.17, 0]} rotation={[-0.33, 0, 0]}>
                <group position={[0, 0.19, 0]} rotation={[-0.07, 0, 0]}>
                  <group position={[0, 0.07, 0]} rotation={[-0.19, 0, 0]}>
                    <group position={[0, 0.06, 0]} rotation={[-0.19, 0, 0]}>
                      <group
                        position={[0.09, 0.08, 0.01]}
                        rotation={[0.03, -0.22, -0.18]}
                      >
                        <group
                          position={[0, 0.04, 0]}
                          rotation={[-1.38, -0.15, -0.45]}
                        >
                          <group
                            position={[0, 0.03, 0]}
                            rotation={[-1.89, -0.68, -0.21]}
                          >
                            <group
                              position={[0, 0.04, 0]}
                              rotation={[-0.29, -0.62, 0.64]}
                            />
                          </group>
                        </group>
                      </group>
                      <group
                        position={[-0.09, 0.08, 0.01]}
                        rotation={[0.03, 0.22, 0.18]}
                      >
                        <group
                          position={[0, 0.04, 0]}
                          rotation={[-1.38, 0.15, 0.45]}
                        >
                          <group
                            position={[0, 0.03, 0]}
                            rotation={[-1.89, 0.68, 0.21]}
                          >
                            <group
                              position={[0, 0.04, 0]}
                              rotation={[-0.29, 0.62, -0.64]}
                            />
                          </group>
                        </group>
                      </group>
                      <group
                        position={[0.05, 0.19, 0.09]}
                        rotation={[-2.99, 1.24, -0.63]}
                      >
                        <group
                          position={[-0.02, 0, 0.03]}
                          rotation={[-0.01, -0.57, 0]}
                        >
                          <group
                            position={[-0.02, 0, 0.04]}
                            rotation={[0.52, -0.61, 0.44]}
                          >
                            <group
                              position={[-0.01, 0.07, -0.03]}
                              rotation={[-2.36, 0.24, 0.01]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group
                  position={[0.02, 0.14, 0.08]}
                  rotation={[-1.54, 0, -1.04]}
                >
                  <group
                    position={[-0.01, 0.21, 0.06]}
                    rotation={[3.09, 0.53, 2.66]}
                  >
                    <group
                      position={[0, 0.29, 0]}
                      rotation={[-0.15, -1.01, -0.49]}
                    >
                      <group
                        position={[0, 0.26, 0]}
                        rotation={[-0.23, 0.05, -0.04]}
                      >
                        <group
                          position={[-0.01, 0.04, 0.02]}
                          rotation={[-2.7, 1.56, 2.85]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.35, 0.04, -0.15]}
                          >
                            <group
                              position={[0, 0.05, 0]}
                              rotation={[0.16, -0.01, -0.01]}
                            />
                          </group>
                          <group
                            position={[0, -0.01, 0.02]}
                            rotation={[-1.55, 1.26, 1.99]}
                          >
                            <group
                              position={[0, 0.04, 0]}
                              rotation={[0.32, -0.04, -0.14]}
                            />
                          </group>
                        </group>
                        <group
                          position={[-0.01, 0.04, 0.01]}
                          rotation={[-1.46, 1.55, 1.53]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.44, 0.02, -0.06]}
                          >
                            <group
                              position={[0, 0.05, 0]}
                              rotation={[0.24, -0.08, -0.02]}
                            />
                          </group>
                        </group>
                        <group
                          position={[-0.01, 0.04, -0.01]}
                          rotation={[-0.91, 1.51, 0.84]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.57, -0.02, 0]}
                          >
                            <group
                              position={[0, 0.04, 0]}
                              rotation={[0.15, -0.04, -0.04]}
                            />
                          </group>
                        </group>
                        <group
                          position={[0, 0.04, -0.02]}
                          rotation={[-0.43, 1.56, 0.24]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.72, -0.12, 0.05]}
                          >
                            <group
                              position={[0, 0.03, 0]}
                              rotation={[0.09, -0.02, -0.03]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group
                  position={[-0.02, 0.14, 0.08]}
                  rotation={[-1.54, 0, 1.04]}
                >
                  <group
                    position={[0.01, 0.21, 0.06]}
                    rotation={[3.09, -0.53, -2.66]}
                  >
                    <group
                      position={[0, 0.29, 0]}
                      rotation={[-0.15, 1.01, 0.49]}
                    >
                      <group
                        position={[0, 0.26, 0]}
                        rotation={[-0.23, -0.05, 0.04]}
                      >
                        <group
                          position={[0.01, 0.04, 0.02]}
                          rotation={[-2.7, -1.56, -2.85]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.35, -0.04, 0.15]}
                          >
                            <group
                              position={[0, 0.05, 0]}
                              rotation={[0.16, 0.01, 0.01]}
                            />
                          </group>
                          <group
                            position={[0, -0.01, 0.02]}
                            rotation={[-1.55, -1.26, -1.99]}
                          >
                            <group
                              position={[0, 0.04, 0]}
                              rotation={[0.32, 0.04, 0.14]}
                            />
                          </group>
                        </group>
                        <group
                          position={[0.01, 0.04, 0.01]}
                          rotation={[-1.46, -1.55, -1.53]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.43, -0.02, 0.06]}
                          >
                            <group
                              position={[0, 0.05, 0]}
                              rotation={[0.24, 0.08, 0.02]}
                            />
                          </group>
                        </group>
                        <group
                          position={[0.01, 0.04, -0.01]}
                          rotation={[-0.91, -1.51, -0.84]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.57, 0.02, 0]}
                          >
                            <group
                              position={[0, 0.04, 0]}
                              rotation={[0.15, 0.04, 0.04]}
                            />
                          </group>
                        </group>
                        <group
                          position={[0, 0.04, -0.02]}
                          rotation={[-0.43, -1.56, -0.24]}
                        >
                          <group
                            position={[0, 0.07, 0]}
                            rotation={[0.72, 0.12, -0.05]}
                          >
                            <group
                              position={[0, 0.03, 0]}
                              rotation={[0.09, 0.02, 0.03]}
                            />
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
          <group position={[0.1, 0.07, 0.03]} rotation={[-3.01, 0, 0]}>
            <group position={[0, 0.54, 0]} rotation={[0.43, 0.01, 0]}>
              <group position={[0, 0.45, 0]} rotation={[-0.49, 0, 0]} />
            </group>
          </group>
          <group position={[-0.1, 0.07, 0.03]} rotation={[-2.84, 0, 0]}>
            <group position={[0, 0.58, 0]} rotation={[0.43, -0.01, 0]}>
              <group position={[0, 0.41, 0]} rotation={[-0.49, 0, 0]} />
            </group>
          </group>
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          material={materials["Material.002"]}
          position={[0.01, 1.56, -0.01]}
          scale={[-0.18, -0.13, -0.1]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(geometryGuy);
