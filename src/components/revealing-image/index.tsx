import { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import {
  Canvas,
  extend,
  useFrame,
  useLoader,
  useThree,
} from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

const PixelatedShaderMaterial = shaderMaterial(
  {
    uPixelSize: 1.0,
  },
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  `
    uniform sampler2D uTexture;
    uniform float uPixelSize;
    varying vec2 vUv;

    void main() {
      vec2 uv = floor(vUv / uPixelSize) * uPixelSize;
      gl_FragColor = texture2D(uTexture, uv);
    }
  `
)

extend({ PixelatedShaderMaterial })

const STEP_TIME = 0.3
const MAX_STEP = 12

function PixelatedImage({
  path,
  isVisible,
}: {
  path: string
  isVisible: boolean
}) {
  const { viewport } = useThree()
  const texture = useLoader(THREE.TextureLoader, path)
  const [startTime, setStartTime] = useState<number | null>(null)

  const material = useMemo(() => {
    const mat = new PixelatedShaderMaterial()
    mat.uniforms.uTexture = new THREE.Uniform(texture)
    return mat
  }, [texture])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()

    if (!isVisible) {
      // // ALLOW RESET
      // if (startTime !== null) {
      //   setStartTime(null)
      // }
      return
    }

    if (startTime === null) {
      setStartTime(elapsed)
      return
    }

    const time = elapsed - startTime
    const step = Math.floor(time / STEP_TIME)
    if (step < MAX_STEP) {
      const pixelSize = 1 / Math.pow(2, step)
      material.uniforms.uPixelSize.value = pixelSize
    }
  })

  return (
    <mesh material={material}>
      <planeGeometry args={[viewport.width, viewport.height]} />
    </mesh>
  )
}

function RevealingImage({
  width = null,
  path,
}: {
  width?: string | null
  path: string
}) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 } // Adjust threshold as needed
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: width || "100%", aspectRatio: "4 / 3" }}
    >
      <Canvas>
        <PixelatedImage path={path} isVisible={isVisible} />
      </Canvas>
    </div>
  )
}

export default RevealingImage
