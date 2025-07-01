"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type { Mesh } from "three"

export function FloatingElements() {
  const group = useRef<any>()

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={group}>
      {/* Floating spheres */}
      {Array.from({ length: 5 }).map((_, i) => (
        <FloatingSphere key={i} position={[Math.sin(i * 2) * 3, Math.cos(i * 2) * 2, Math.sin(i) * 2]} />
      ))}
    </group>
  )
}

function FloatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} emissive="#8b5cf6" emissiveIntensity={0.2} />
    </mesh>
  )
}
