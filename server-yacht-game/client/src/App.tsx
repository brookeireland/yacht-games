import { useState } from "react";
import Game from "./Game";
import { Start } from "./Start";
import { User } from "./types";

function App() {
  const [user, setUser] = useState<User>();
  return <>{user ? <Game user={user} /> : <Start onSetUser={setUser} />}</>;
}

export default App;
