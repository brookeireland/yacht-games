import React, { useEffect } from "react";
import { apiGameList, apiNewGame } from "./api";
import { User } from "./types";

export function GameList({
  user,
  onSetGame,
}: {
  user: User;
  onSetGame: React.Dispatch<React.SetStateAction<any>>;
}) {
  // const fetchGameList = async () => {
  //   const list = await apiGameList(user.id);
  //   return list;
  // };
  // useEffect(() => {
  //   let list = fetchGameList();
  // });
  const [gameList, setGameList] = React.useState<Record<string, string>[]>([]);
  const handleClick = async () => {
    await apiNewGame(user.id);
    const list = await apiGameList(user.id);
    setGameList(list);
  };

  const handleGameClick = (game: any) => {
    onSetGame(game);
  };
  return (
    <>
      Hello {user.name}
      {gameList.map((val) => (
        <li onClick={() => handleGameClick(val)}>{val.data}</li>
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
