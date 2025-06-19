import { CategoryName } from "./categories";

export type User = {
  id: number;
  name: string;
  topScore: number;
};

export type Game = {
  id: number;
  userId: number;
  data: JSON;
};

export type GameListItem = {
  data: BoardData;
  rowid: number;
};
export type GameListResponse = GameListItem[];

export type BoardData = {
  rollCount: number;
  dice: Dice;
  isSelected: ReadonlyArray<boolean>;
  scores: CategoryScore;
};

export type CategoryScore = Readonly<Record<CategoryName, number | null>>;
export type Calculator = (dice: Dice, yacht?: boolean) => number;
export type Dice = readonly number[];
