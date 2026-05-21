import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import store from '../store';
import theme from '../data/theme.json';

const cfg = theme.particles;
const NODE_COUNT = cfg.count || 60;
const CONNECTION_DIST = 3.0;
const MAX_LINES = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
const BASE_SIZE = (cfg.size || 1.0) * 50;
const SPEED = cfg.speed || 0.15;
const OPACITY = cfg.opacity || 0.6;
const SPREAD = cfg.spread || 5.0;

export default function NetworkLines() {
  const linesRef = useRef();
  const dotsRef = useRef();

  const { nodeData, linePositions, lineAlphas, dotPositions, dotSizes, dotTypes } = useMemo(() => {
    const nodes = [];
    const sizes = new Float32Array(NODE_COUNT);
    const types = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 18,
        y: (Math.random() - 0.5) * 12,
        z: (Math.random() - 0.5) * SPREAD * 0.6,
        vx: (Math.random() - 0.5) * SPEED * 0.02,
        vy: (Math.random() - 0.5) * SPEED * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
      sizes[i] = BASE_SIZE * (0.3 + Math.random() * 1.0);
      types[i] = Math.random() > 0.5 ? 1.0 : 0.0;
    }

    return {
      nodeData: nodes,
      linePositions: new Float32Array(MAX_LINES * 6),
      lineAlphas: new Float32Array(MAX_LINES * 2),
      dotPositions: new Float32Array(NODE_COUNT * 3),
      dotSizes: sizes,
      dotTypes: types,
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const scroll = store.scroll;

    for (let i = 0; i < NODE_COUNT; i++) {
      const n = nodeData[i];
      n.x += Math.sin(t * 0.15 + n.phase) * 0.003 + n.vx;
      n.y += Math.cos(t * 0.12 + n.phase * 1.3) * 0.003 + n.vy;
      n.z = Math.sin(t * 0.1 + n.phase * 0.7 + scroll * 2) * 1.5;

      if (n.x > 9) n.x = -9;
      if (n.x < -9) n.x = 9;
      if (n.y > 6) n.y = -6;
      if (n.y < -6) n.y = 6;

      dotPositions[i * 3] = n.x;
      dotPositions[i * 3 + 1] = n.y;
      dotPositions[i * 3 + 2] = n.z;
    }

    let idx = 0;
    const dist = CONNECTION_DIST + scroll * 0.5;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const a = nodeData[i];
        const b = nodeData[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dz = a.z - b.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < dist && idx < MAX_LINES) {
          const li = idx * 6;
          linePositions[li] = a.x;
          linePositions[li + 1] = a.y;
          linePositions[li + 2] = a.z;
          linePositions[li + 3] = b.x;
          linePositions[li + 4] = b.y;
          linePositions[li + 5] = b.z;

          const alpha = (1 - d / dist) * 0.12;
          lineAlphas[idx * 2] = alpha;
          lineAlphas[idx * 2 + 1] = alpha;
          idx++;
        }
      }
    }

    for (let i = idx * 6; i < MAX_LINES * 6; i++) linePositions[i] = 0;
    for (let i = idx * 2; i < MAX_LINES * 2; i++) lineAlphas[i] = 0;

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.attributes.alpha.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, idx * 2);
    }
    if (dotsRef.current) {
      dotsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const lineMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: `
        attribute float alpha;
        varying float vAlpha;
        void main() {
          vAlpha = alpha;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vAlpha);
        }
      `,
    });
  }, []);

  return (
    <group rotation={[0, 0, Math.PI * 0.02]}>
      <lineSegments ref={linesRef} material={lineMaterial}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={MAX_LINES * 2}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-alpha"
            array={lineAlphas}
            count={MAX_LINES * 2}
            itemSize={1}
          />
        </bufferGeometry>
      </lineSegments>
      <points ref={dotsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={dotPositions}
            count={NODE_COUNT}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            array={dotSizes}
            count={NODE_COUNT}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aType"
            array={dotTypes}
            count={NODE_COUNT}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          uniforms={{ uOpacity: { value: OPACITY * 0.12 } }}
          vertexShader={`
            attribute float aSize;
            attribute float aType;
            varying float vType;
            void main() {
              vType = aType;
              vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
              gl_PointSize = aSize * (300.0 / -mvPos.z);
              gl_Position = projectionMatrix * mvPos;
            }
          `}
          fragmentShader={`
            uniform float uOpacity;
            varying float vType;
            void main() {
              vec2 uv = gl_PointCoord * 2.0 - 1.0;
              float dist = length(uv);
              if (dist > 1.0) discard;
              float alpha;
              if (vType < 0.5) {
                alpha = smoothstep(1.0, 0.9, dist) * uOpacity;
              } else {
                float ring = smoothstep(1.0, 0.88, dist) - smoothstep(0.82, 0.7, dist);
                alpha = ring * uOpacity * 1.4;
              }
              if (alpha < 0.001) discard;
              gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
            }
          `}
        />
      </points>
    </group>
  );
}
