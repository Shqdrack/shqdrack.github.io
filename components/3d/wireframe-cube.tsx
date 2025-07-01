"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type { Mesh } from "three"

function WireframeCube() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#000000" wireframe transparent opacity={0.6} />
    </mesh>
  )
}

function WireframeCubeDark() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.6} />
    </mesh>
  )
}

interface WireframeCubeSceneProps {
  isDark?: boolean
}

export function WireframeCubeScene({ isDark = false }: WireframeCubeSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>{isDark ? <WireframeCubeDark /> : <WireframeCube />}</Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
