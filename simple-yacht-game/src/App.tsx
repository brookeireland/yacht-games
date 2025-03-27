import { useState } from "react";
import "./App.css";
import { bonusScore, categories, Category, totalScore } from "./categories";

//save top score in cookie

function App() {
  const [dice, setDice] = useState([6, 6, 6, 6, 6]);
  const [isSelected, setIsSelected] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
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
    if (rollCount === 3) return;
    const selectedDupe: boolean[] = structuredClone(isSelected);
    selectedDupe[index] = !selectedDupe[index];
    setIsSelected(selectedDupe);
  }

  function handleSubmitClick(cat: Category) {
    cat.value = cat.calculate(dice);
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
            <td> Category</td>
            <td>Submitted</td>
            <td>Dice Score</td>
          </tr>
          {categories.map((cat) => {
            return (
              <tr>
                <td>
                  <button
                    disabled={cat.value !== null || rollCount === 3}
                    onClick={() => {
                      handleSubmitClick(cat);
                    }}
                  >
                    {cat.name}
                  </button>
                </td>
                <td>{cat.value}</td>
                <td>{cat.calculate(dice)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>Bonus Score Progress: {bonusScore()}/63</div>
      <div>Total score: {totalScore()}</div>
    </>
  );
}

export default App;
