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

export type GameListResponse = {
  data: any;
  rowid: number;
}[];
