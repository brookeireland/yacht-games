import { useState } from "react";
import "./App.css";
import { categories } from "./categories";

function App() {
  const [dice, setDice] = useState([6, 6, 6, 6, 6]);
  const [isSelected, setIsSelected] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [score, setScore] = useState(0);
  const [rollCount, setRollCount] = useState(3);

  function handleRollClick() {
    const diceDupe: number[] = structuredClone(dice);
    dice.forEach((d, i) => {
      if (!isSelected[i]) {
        let num = Math.floor(Math.random() * 6) + 1;
        diceDupe[i] = num;
      }
    });
    setDice(diceDupe);
    setRollCount(rollCount - 1);
  }

  function handleDieClick(index: number) {
    const selectedDupe: boolean[] = structuredClone(isSelected);
    selectedDupe[index] = !selectedDupe[index];
    setIsSelected(selectedDupe);
  }

  return (
    <>
      <div className="diceBox">
        {dice.map((d, index) => {
          return (
            <div
              className={isSelected[index] ? "selectedDice" : "dice"}
              onClick={() => handleDieClick(index)}
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
          {categories.map((cat) => {
            return (
              <tr>
                <td>
                  <button
                    onClick={() => {
                      if (rollCount === 0) setRollCount(3);
                      cat.calculate();
                    }}
                  >
                    {cat.name}
                  </button>
                </td>
                <td>{cat.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>Total score: {score}</div>
    </>
  );
}

export default App;
