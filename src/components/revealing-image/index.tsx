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

/*
  // SETTINGS
*/
const STEP_TIME = 0.14
const MAX_STEP = 10

/*
  // INITITALIZE SHADER
*/
const PixelatedShaderMaterial = shaderMaterial(
  {
    uElapsedTime: 0.0,
    uStepTime: STEP_TIME,
    uMaxStep: MAX_STEP,
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
    uniform float uElapsedTime;
    uniform float uStepTime;
    uniform float uMaxStep;

    varying vec2 vUv;

    void main() {
      float progress = min(1.0, (uElapsedTime / uStepTime) / uMaxStep);

      // Pixelation effect
      // float step = max(0.0, min(floor(uElapsedTime / uStepTime) - uMaxStep / 2.0, uMaxStep / 2.0));
      float step = min(floor(uElapsedTime / uStepTime), uMaxStep);
      float pixelSize = 1.0 / pow(2.0, step);

      vec2 uv = floor(vUv / pixelSize) * pixelSize;
      vec3 color = texture2D(uTexture, uv).rgb;


      // horizontal curtain effect
      vec3 darkColor = vec3(0.1, 0.1, 0.1);
      vec3 blueColor = vec3(0.1, 0.1, 0.7);

      float alpha = progress * 3.0 - vUv.x;

      if (alpha < 0.0) {
        gl_FragColor = vec4(darkColor, 1.0);
      } else {
        color = smoothstep(0.0, 1.0, alpha) * color + (1.0 - smoothstep(0.0, 1.0, alpha)) * blueColor;
        gl_FragColor = vec4(color, 1.0);
      }
    }
  `
)

extend({ PixelatedShaderMaterial })

function PixelatedImage({
  path,
  isVisible,
}: {
  path: string
  isVisible: boolean
}) {
  const { viewport } = useThree()
  const texture = useLoader(THREE.TextureLoader, path)

  const material = useMemo(() => {
    const mat = new PixelatedShaderMaterial()
    mat.uniforms.uTexture = new THREE.Uniform(texture)
    return mat
  }, [texture])

  useFrame((_state, delta) => {
    if (!isVisible) {
      return
    }

    material.uniforms.uElapsedTime.value += delta
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
      <Canvas
        resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
        dpr={[1, 2]}
      >
        <PixelatedImage path={path} isVisible={isVisible} />
      </Canvas>
    </div>
  )
}

export default RevealingImage
