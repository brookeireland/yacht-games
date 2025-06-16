import { useState } from "react";
import Board from "./game/Game";

import { Start } from "./login/Start";
import { Game, User } from "./types";
import { GameList } from "./GameList";

function App() {
  const [user, setUser] = useState<User>();
  const [game, setGame] = useState<Game>();
  return (
    <>
      {user ? (
        game ? (
          <Board user={user} />
        ) : (
          <GameList user={user} onSetGame={setGame} />
        )
      ) : (
        <Start onSetUser={setUser} />
      )}
    </>
  );
}

export default App;
