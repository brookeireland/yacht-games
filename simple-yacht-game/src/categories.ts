import { MouseEventHandler } from "react";

//todo function type
type Category = { name: string; calculate: any; value: number | null };
export const categories: Category[] = [
  { name: "ones", calculate: calculateOnes, value: null },
  { name: "twos", calculate: calculateTwos, value: null },
  { name: "threes", calculate: calculateThrees, value: null },
  { name: "fours", calculate: calculateFours, value: null },
  { name: "fives", calculate: calculateFives, value: null },
  { name: "sixes", calculate: calculateSixes, value: null },
  { name: "3 of a kind", calculate: calculate3X, value: null },
  { name: "4 of a kind", calculate: calculate4X, value: null },
  { name: "full house", calculate: calculateFullHouse, value: null },
  { name: "small straight", calculate: calculateSmallStraight, value: null },
  { name: "large straight", calculate: calculateLargeStraight, value: null },
  { name: "yacht", calculate: calculateYacht, value: null },
  { name: "choice", calculate: calculateChoice, value: null },
];

function calculateOnes(dice: number[]) {
  console.log("One1");
}
function calculateTwos(dice: number[]) {}
function calculateThrees(dice: number[]) {}
function calculateFours(dice: number[]) {}
function calculateFives(dice: number[]) {}
function calculateSixes(dice: number[]) {}
function calculate3X(dice: number[]) {}
function calculate4X(dice: number[]) {}
function calculateFullHouse(dice: number[]) {}
function calculateSmallStraight(dice: number[]) {}
function calculateLargeStraight(dice: number[]) {}
function calculateYacht(dice: number[]) {}
function calculateChoice(dice: number[]) {}
