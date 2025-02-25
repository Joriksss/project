import React from "react";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Загрузите изображение, чтобы узнать, что на нём изображено.</h1>
      <ImageUpload />
    </div>
  );
}

export default App;
