export type CategoryName = keyof typeof categories;
export type CategoryScore = Readonly<Record<CategoryName, number | null>>;
export type Calculator = (dice: number[]) => number;

const categories = {
  ones: calculateOnes,
  twos: calculateTwos,
  threes: calculateThrees,
  fours: calculateFours,
  fives: calculateFives,
  sixes: calculateSixes,
  "3 of a kind": calculate3X,
  "4 of a kind": calculate4X,
  "full house": calculateFullHouse,
  "small straight": calculateSmallStraight,
  "large straight": calculateLargeStraight,
  yacht: calculateYacht,
  choice: calculateChoice,
};

//make less duplicate
const upperCategories: CategoryName[] = [
  "ones",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
];

export function categoryCaluculators(): [CategoryName, Calculator][] {
  return Object.entries(categories) as [CategoryName, Calculator][];
}

export function allCategoryNames(): CategoryName[] {
  return Object.keys(categories) as CategoryName[];
}

function mapValues<K extends string, I, O>(
  obj: Record<K, I>,
  fn: (k: K) => O
): Record<K, O> {
  return Object.fromEntries(
    Object.keys(obj).map((k) => [k, fn(k as K)])
  ) as Record<K, O>;
}

export function defaultScores(): CategoryScore {
  return mapValues(categories, () => null);
  // return Object.fromEntries(
  //   allCategoryNames().map((name) => {
  //     return [name, null];
  //   })
  // );
}

export function bonusScore(scores: CategoryScore) {
  let score = 0;
  Object.entries(scores).map(([cat, s]) => {
    if (upperCategories.includes(cat as CategoryName) && s != null) {
      score = score + s;
    }
  });

  return score;
}

export function totalScore(scores: CategoryScore) {
  let score = 0;
  Object.values(scores).map((s) => {
    if (s !== null) {
      score = score + s;
    }
  });
  //if top section score is greater than 63 get 35 bonus points
  if (bonusScore(scores) > 63) score = score + 35;

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
