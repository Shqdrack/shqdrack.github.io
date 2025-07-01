"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { EffectComposer, DepthOfField, Bloom } from "@react-three/postprocessing"
import type { Mesh } from "three"

function AnimatedCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#3b82f6"
        transparent
        opacity={0.8}
        wireframe
        emissive="#1e40af"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}

function FloatingElements() {
  const group = useRef<any>()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={group}>
      {Array.from({ length: 3 }).map((_, i) => (
        <FloatingSphere key={i} position={[Math.sin(i * 2) * 2, Math.cos(i * 2) * 1.5, Math.sin(i) * 1.5]} />
      ))}
    </group>
  )
}

function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} emissive="#7c3aed" emissiveIntensity={0.2} />
    </mesh>
  )
}

export function OptimizedCubeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />

      <Suspense fallback={null}>
        <AnimatedCube />
        <FloatingElements />
        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={1.5} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} intensity={0.5} />
      </EffectComposer>
    </Canvas>
  )
}

export function CubeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-500 dark:border-purple-500 border-t-transparent rounded-lg animate-spin" />
    </div>
  )
}
