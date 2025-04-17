import RevealingImage from "./components/revealing-image"

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        paddingBottom: "100px",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            width: "min(100%, 2000px)",
            padding: "40px",
            marginBottom: "100px",
          }}
        >
          Revealing Image
        </h1>
      </section>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul
          style={{
            width: "min(100%, 2000px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            listStyle: "none",
            gap: "200px",
          }}
        >
          <li style={{ alignSelf: "start", width: "min(50%, 800px)" }}>
            <RevealingImage path="img/bmx.jpg" />
          </li>

          <li style={{ alignSelf: "end", width: "min(50%, 800px)" }}>
            <RevealingImage path="img/love.jpg" />
          </li>

          <li style={{ alignSelf: "start", width: "min(50%, 800px)" }}>
            <RevealingImage path="img/river.jpg" />
          </li>

          <li style={{ alignSelf: "end", width: "min(50%, 800px)" }}>
            <RevealingImage path="img/running.jpg" />
          </li>

          <li style={{ alignSelf: "start", width: "min(50%, 800px)" }}>
            <RevealingImage path="img/subway.jpg" />
          </li>
        </ul>
      </section>
    </div>
  )
}

export default App
