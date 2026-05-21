import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import NetworkLines from './NetworkLines';

export default function ThreeScene({ onCreated }) {
  return (
    <div className="three-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={(state) => {
          state.gl.setClearColor(0x0a0a0a, 1);
          if (onCreated) onCreated();
        }}
      >
        <Suspense fallback={null}>
          <NetworkLines />
        </Suspense>
      </Canvas>
    </div>
  );
}
