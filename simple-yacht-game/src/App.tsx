import { useState } from "react";
import "./App.css";

function App() {
  const [dice, setDice] = useState([6, 6, 6, 6, 6]);
  const [isSelected, setIsSelected] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  function handleRollClick() {
    const diceDupe: number[] = structuredClone(dice);
    dice.forEach((d, i) => {
      if (!isSelected[i]) {
        let num = Math.floor(Math.random() * 6) + 1;
        diceDupe[i] = num;
      }
    });
    setDice(diceDupe);
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

      <button onClick={() => handleRollClick()}>Roll!</button>
    </>
  );
}

export default App;
