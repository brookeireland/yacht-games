//todo function type
export type Category = { name: string; calculate: any; value: number | null };
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

export function bonusScore() {
  let score = 0;
  for (let i = 0; i < 6; i++) {
    score = score + (categories[i].value || 0);
  }

  return score;
}

export function totalScore() {
  let score = 0;
  categories.map((cat) => {
    if (!!cat.value) {
      score = score + cat.value;
    }
  });
  //if top section score is greater than 63 get 35 bonus points
  if (bonusScore() > 63) score = score + 35;

  //todo add second yacht score
  return score;
}

function sumNumber(dice: number[], num: number) {
  return dice.filter((d) => d === num).length * num;
}

function sumAllDice(dice: number[]) {
  let total = 0;
  dice.forEach((d) => {
    total = total + d;
  });
  return total;
}

function xOfaKind(dice: number[], x: number) {
  const counts = dice.reduce(
    (m, v) => m.set(v, (m.get(v) || 0) + 1),
    new Map()
  );
  for (let y of counts.values()) {
    if (y >= x) {
      return true;
    }
  }
  return false;
}

function calculateOnes(dice: number[]) {
  return sumNumber(dice, 1);
}
function calculateTwos(dice: number[]) {
  return sumNumber(dice, 2);
}
function calculateThrees(dice: number[]) {
  return sumNumber(dice, 3);
}
function calculateFours(dice: number[]) {
  return sumNumber(dice, 4);
}
function calculateFives(dice: number[]) {
  return sumNumber(dice, 5);
}
function calculateSixes(dice: number[]) {
  return sumNumber(dice, 6);
}
function calculate3X(dice: number[]) {
  if (xOfaKind(dice, 3)) {
    return sumAllDice(dice);
  } else return 0;
}
function calculate4X(dice: number[]) {
  if (xOfaKind(dice, 4)) {
    return sumAllDice(dice);
  } else return 0;
}
function calculateFullHouse(dice: number[]) {
  const s = new Set(dice);
  if (s.size === 2) return 25;
  else return 0;
}
function calculateSmallStraight(dice: number[]) {
  //todo figure out
  let s = new Set(dice);
  if (s.size < 4) return 0;
  if ((s.has(1) && s.has(5) && s.has(6)) || !s.has(2)) return 0;
  if ((s.has(6) && s.has(1) && s.has(2)) || !s.has(5)) return 0;

  return 30;
}
function calculateLargeStraight(dice: number[]) {
  let s = new Set(dice);
  if (s.size !== 5 || (s.has(1) && s.has(6))) return 0;
  else return 40;
}
function calculateYacht(dice: number[]) {
  if (xOfaKind(dice, 5)) {
    return 50;
  } else return 0;
}
function calculateChoice(dice: number[]) {
  return sumAllDice(dice);
}
