import { useState } from "react";
import Game from "./Game";
import { Start } from "./Start";

function App() {
  const [username, setUsername] = useState("");
  return <>{username ? <Game /> : <Start onSetUsername={setUsername} />}</>;
}

export default App;
