import { useMemo } from "react"
import * as THREE from "three"
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import ResizableCanvas from "./ResizableCanvas"

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

function PixelatedImage({ path }: { path: string }) {
  const { viewport } = useThree()
  const texture = useLoader(THREE.TextureLoader, path)

  const material = useMemo(() => {
    const mat = new PixelatedShaderMaterial()
    mat.uniforms.uTexture = new THREE.Uniform(texture)
    // mat.uniforms.uPixelSize.value = 0.1 // Adjust this value to control pixelation
    return mat
  }, [texture])

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime()
    const step = Math.floor(elapsed / STEP_TIME)

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
  height = null,
  width = null,
  path,
}: {
  height: number | null
  width: number | null
  path: string
}) {
  return (
    <ResizableCanvas height={height} width={width}>
      <PixelatedImage path={path} />
    </ResizableCanvas>
  )
}

export default RevealingImage
