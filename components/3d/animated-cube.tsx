"use client"

import { useRef, Suspense } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export function AnimatedCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" transparent opacity={0.8} wireframe />
    </mesh>
  )
}

// Fallback component for loading
export function CubeFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-lg animate-spin" />
    </div>
  )
}

// Lazy wrapper
export function LazyAnimatedCube() {
  return (
    <Suspense fallback={<CubeFallback />}>
      <AnimatedCube />
    </Suspense>
  )
}
