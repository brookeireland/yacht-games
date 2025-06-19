import { useState } from "react";
import Board from "./game/Board";

import { Start } from "./login/Start";
import { Game, User } from "./types";
import { GameList } from "./GameList";
import { ErrorBoundary } from "./lib/ErrorBoundary";

function App() {
  const [user, setUser] = useState<User>();
  const [game, setGame] = useState<Game>();
  return (
    <>
      {user ? (
        game ? (
          <ErrorBoundary>
            <Board user={user} />
          </ErrorBoundary>
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
