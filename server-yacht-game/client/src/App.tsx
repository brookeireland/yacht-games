import { useState } from "react";
// import Game from "./game/Game";

import { Start } from "./login/Start";
import { User } from "./types";
import { GameList } from "./GameList";

function App() {
  const [user, setUser] = useState<User>();
  return <>{user ? <GameList user={user} /> : <Start onSetUser={setUser} />}</>;
}

export default App;
