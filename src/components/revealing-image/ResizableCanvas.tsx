import { Canvas } from "@react-three/fiber"

function ResizableCanvas({
  height = null,
  width = null,
  children,
}: {
  height: number | null
  width: number | null
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      <Canvas>{children}</Canvas>
    </div>
  )
}

export default ResizableCanvas
