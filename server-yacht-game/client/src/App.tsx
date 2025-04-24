import { useEffect, useState } from "react";
import "./App.css";
import {
  bonusScore,
  Calculator,
  categoryCaluculators,
  CategoryName,
  defaultScores,
  Dice,
  totalScore,
} from "./categories";
import { useLocalStorageNumber } from "./hooks";

function App() {
  const [scores, setScores] = useState(defaultScores);
  const [dice, setDice] = useState<Dice>([6, 6, 6, 6, 6]);
  const [isSelected, setIsSelected] = useState<ReadonlyArray<boolean>>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [rollCount, setRollCount] = useState(3);
  const [topScore, setTopScore] = useLocalStorageNumber("top score");

  useEffect(() => {
    const ts = totalScore(scores);
    if (!topScore || ts > topScore) {
      setTopScore(ts);
    }
  }, [topScore, scores]);

  function handleRollClick() {
    const diceDupe = [...dice];
    for (let i = 0; i < dice.length; i++) {
      if (!isSelected[i]) {
        let num = Math.floor(Math.random() * 6) + 1;
        diceDupe[i] = num;
      }
    }

    setDice(diceDupe);
    setRollCount(rollCount - 1);
  }

  function handleDieClick(index: number) {
    if (rollCount === 3) return;
    const selectedDupe = [...isSelected];
    selectedDupe[index] = !selectedDupe[index];
    setIsSelected(selectedDupe);
  }

  function handleSubmitClick(cat: CategoryName, calculate: Calculator) {
    let score = calculate(dice);
    if (scores["yacht"] !== null) score += 50;
    setScores({ ...scores, [cat]: score });
    setRollCount(3);
    setIsSelected([false, false, false, false, false]);
  }

  return (
    <>
      <div className="diceBox">
        {dice.map((d, index) => {
          return (
            <div
              className={isSelected[index] ? "selectedDice" : "dice"}
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
        disabled={!!!rollCount}
      >
        Roll! {rollCount} left
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
                    disabled={scores[cat] !== null || rollCount === 3}
                    onClick={() => {
                      handleSubmitClick(cat, calculate);
                    }}
                  >
                    {cat}
                  </button>
                </td>
                <td>{scores[cat]}</td>
                <td>
                  {rollCount === 3
                    ? null
                    : calculate(dice, scores["yacht"] !== null)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>Bonus Score (35 points) Progress: {bonusScore(scores)}/63</div>
      <div>Total score: {totalScore(scores)}</div>
      <div>Top score: {topScore}</div>
    </>
  );
}

export default App;
