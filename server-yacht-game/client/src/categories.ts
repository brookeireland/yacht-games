export type CategoryName = keyof typeof categories;
export type CategoryScore = Readonly<Record<CategoryName, number | null>>;
export type Calculator = (dice: Dice, yacht?: boolean) => number;
export type Dice = readonly number[];

export const categories = {
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

function sumNumber(dice: Dice, num: number) {
  return dice.filter((d) => d === num).length * num;
}

function sumAllDice(dice: Dice) {
  let total = 0;
  for (const d of dice) {
    total = total + d;
  }
  return total;
}

function xOfaKind(dice: Dice, x: number) {
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

function calculateOnes(dice: Dice, yacht?: boolean) {
  return sumNumber(dice, 1) + (yacht ? 50 : 0);
}
function calculateTwos(dice: Dice, yacht?: boolean) {
  return sumNumber(dice, 2) + (yacht ? 50 : 0);
}
function calculateThrees(dice: Dice, yacht?: boolean) {
  return sumNumber(dice, 3) + (yacht ? 50 : 0);
}
function calculateFours(dice: Dice, yacht?: boolean) {
  return sumNumber(dice, 4) + (yacht ? 50 : 0);
}
function calculateFives(dice: Dice, yacht?: boolean) {
  return sumNumber(dice, 5) + (yacht ? 50 : 0);
}
function calculateSixes(dice: Dice, yacht?: boolean) {
  return sumNumber(dice, 6) + (yacht ? 50 : 0);
}
function calculate3X(dice: Dice, yacht?: boolean) {
  if (xOfaKind(dice, 3)) {
    return sumAllDice(dice) + (yacht ? 50 : 0);
  } else return 0 + (yacht ? 50 : 0);
}
function calculate4X(dice: Dice, yacht?: boolean) {
  if (xOfaKind(dice, 4)) {
    return sumAllDice(dice) + (yacht ? 50 : 0);
  } else return 0 + (yacht ? 50 : 0);
}
function calculateFullHouse(dice: Dice, yacht?: boolean) {
  if (xOfaKind(dice, 2) && xOfaKind(dice, 3) && !xOfaKind(dice, 4))
    return 25 + (yacht ? 50 : 0);
  else return 0 + (yacht ? 50 : 0);
}
function calculateSmallStraight(dice: Dice, yacht?: boolean) {
  const sortedDice = [...dice].sort();
  let consecutive = 1;
  let consecutiveMax = 1;
  for (let i = 1; i < sortedDice.length; i++) {
    if (sortedDice[i] === sortedDice[i - 1]) continue;
    if (sortedDice[i] === sortedDice[i - 1] + 1) {
      consecutive++;
      consecutiveMax = Math.max(consecutive, consecutiveMax);
    } else {
      consecutive = 1;
    }
  }

  if (consecutiveMax >= 4) return 30 + (yacht ? 50 : 0);
  return 0 + (yacht ? 50 : 0);
}
function calculateLargeStraight(dice: Dice, yacht?: boolean) {
  let s = new Set(dice);
  //large straight must use all dice, and cannot have both 1 and 6
  if (s.size !== 5 || (s.has(1) && s.has(6))) return 0 + (yacht ? 50 : 0);
  else return 40 + (yacht ? 50 : 0);
}
function calculateYacht(dice: Dice) {
  const s = new Set(dice);
  if (s.size !== 1) return 0;
  else return 50;
}
function calculateChoice(dice: Dice, yacht?: boolean) {
  return sumAllDice(dice) + (yacht ? 50 : 0);
}
