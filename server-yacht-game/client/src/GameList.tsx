import React from "react";
import { apiGameList, apiNewGame } from "./api";
import { GameListItem, GameListResponse, User } from "./types";
import { useAsyncEffect } from "./lib/useAsyncEffect";

export function GameList({
  user,
  onSetGame,
}: {
  user: User;
  onSetGame: React.Dispatch<React.SetStateAction<GameListItem | undefined>>;
}) {
  useAsyncEffect(async () => {
    let list = await apiGameList(user.id);
    setGameList(list);
  }, []);

  const [gameList, setGameList] = React.useState<GameListResponse>([]);
  const handleClick = async () => {
    await apiNewGame(user.id);
    const list = await apiGameList(user.id);
    setGameList(list);
  };

  const handleGameClick = (game: GameListItem) => {
    onSetGame(game);
  };
  return (
    <>
      Hello {user.name}
      {gameList.map((val) => (
        <li onClick={() => handleGameClick(val)}>
          {val.rowid} - {JSON.stringify(val.data)}
        </li>
      ))}
      <button
        onClick={() => {
          handleClick();
        }}
      >
        New Game
      </button>
    </>
  );
}
