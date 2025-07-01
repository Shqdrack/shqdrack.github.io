"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing"
import { Suspense } from "react"
import { LazyAnimatedCube } from "./animated-cube"

export function SceneWithEffects() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]} performance={{ min: 0.5 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Suspense fallback={null}>
        <LazyAnimatedCube />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  )
}
