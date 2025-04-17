import RevealingImage from "./components/revealing-image"

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <h1 style={{ padding: "40px" }}>Revealing Image</h1>

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <RevealingImage height={600} width={800} path="img/bmx.jpg" />
      </div>
    </div>
  )
}

export default App
