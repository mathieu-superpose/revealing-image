import { Canvas } from "@react-three/fiber"

function ResizableCanvas({
  width = null,
  children,
}: {
  width: string | null
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        width: width ? `${width}` : "100%",
        aspectRatio: "4 / 3",
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
