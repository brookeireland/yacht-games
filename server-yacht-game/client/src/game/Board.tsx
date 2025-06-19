import { useEffect, useState } from "react";
import "./Board.css";
import {
  bonusScore,
  categoryCaluculators,
  CategoryName,
  defaultScores,
  totalScore,
} from "../categories";
import { BoardData, Calculator, GameListItem, User } from "../types";
import { apiTopScore } from "../api";

function Board({ user, game }: { user: User; game: GameListItem }) {
  const [data, setData] = useState<BoardData>({
    //@ts-ignore
    rollCount: 3,
    //@ts-ignore
    dice: [6, 6, 6, 6, 6],
    //@ts-ignore
    isSelected: [false, false, false, false, false],
    //@ts-ignore
    scores: defaultScores(),
    ...game.data,
  });
  const [topScore, setTopScore] = useState(user.topScore || 0);
  console.log({ user });

  useEffect(() => {
    const ts = totalScore(data.scores);
    if (!topScore || ts > topScore) {
      setTopScore(ts);
      //todo
      apiTopScore(ts, user.name);
    }
  }, [topScore, data.scores]);

  function handleRollClick() {
    setData((prev) => {
      const dice = [...prev.dice];
      for (let i = 0; i < prev.dice.length; i++) {
        if (!prev.isSelected[i]) {
          let num = Math.floor(Math.random() * 6) + 1;
          dice[i] = num;
        }
      }
      return { ...prev, rollCount: prev.rollCount - 1, dice: dice };
    });
  }

  function handleDieClick(index: number) {
    if (data.rollCount === 3) return;

    setData((prev) => {
      const isSelected = [...prev.isSelected];
      isSelected[index] = !isSelected[index];
      return { ...prev, isSelected };
    });
  }

  function handleSubmitClick(cat: CategoryName, calculate: Calculator) {
    setData((prev) => {
      let score = calculate(data.dice);
      if (prev.scores["yacht"] !== null) score += 50;
      return {
        ...prev,
        rollCount: 3,
        isSelected: [false, false, false, false, false],
        scores: { ...prev.scores, [cat]: score },
      };
    });
  }
  function buildDebugOutput() {
    return JSON.stringify(data, null, 2);
  }

  return (
    <>
      <pre
        style={{ position: "absolute", top: 0, left: 10, textAlign: "left" }}
      >
        {buildDebugOutput()}
      </pre>
      <div>Name: {user.name}</div>
      <div>Id: {user.id}</div>
      <div className="diceBox">
        {data.dice.map((d, index) => {
          return (
            <div
              className={data.isSelected[index] ? "selectedDice" : "dice"}
              onClick={() => handleDieClick(index)}
              key={index.toString()}
            >
              {d}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          handleRollClick();
        }}
        disabled={!!!data.rollCount}
      >
        Roll! {data.rollCount} left
      </button>
      <table>
        <tbody>
          <tr>
            <td>Category</td>
            <td>Submitted</td>
            <td>Dice Score</td>
          </tr>
          {categoryCaluculators().map(([cat, calculate]) => {
            return (
              <tr key={cat}>
                <td>
                  <button
                    disabled={data.scores[cat] !== null || data.rollCount === 3}
                    onClick={() => {
                      handleSubmitClick(cat, calculate);
                    }}
                  >
                    {cat}
                  </button>
                </td>
                <td>{data.scores[cat]}</td>
                <td>
                  {data.rollCount === 3
                    ? null
                    : calculate(data.dice, data.scores["yacht"] !== null)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>Bonus Score (35 points) Progress: {bonusScore(data.scores)}/63</div>
      <div>Total score: {totalScore(data.scores)}</div>
      <div>Top score: {topScore}</div>
    </>
  );
}

export default Board;
