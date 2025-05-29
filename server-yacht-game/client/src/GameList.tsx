import { apiNewGame } from "./api";
import { User } from "./types";

export function GameList({ user }: { user: User }) {
  const handleClick = async () => {
    console.log("click");
    const game = await apiNewGame(user.id);
    console.log({ game });
  };
  return (
    <>
      Hello {user.name}
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
