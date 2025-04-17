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
      <h1 style={{ padding: "40px", marginBottom: "100px" }}>
        Revealing Image
      </h1>

      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          listStyle: "none",
          gap: "200px",
        }}
      >
        <li style={{ alignSelf: "start" }}>
          <RevealingImage height={600} width={800} path="img/bmx.jpg" />
        </li>
        <li style={{ alignSelf: "end" }}>
          <RevealingImage height={600} width={800} path="img/love.jpg" />
        </li>

        <li style={{ alignSelf: "start" }}>
          <RevealingImage height={600} width={800} path="img/river.jpg" />
        </li>
        <li style={{ alignSelf: "end" }}>
          <RevealingImage height={600} width={800} path="img/running.jpg" />
        </li>
        <li style={{ alignSelf: "start" }}>
          <RevealingImage height={600} width={800} path="img/subway.jpg" />
        </li>
      </ul>
    </div>
  )
}

export default App
