import BoardConfig, { TradeActions } from "./map";

export const STONES_PERCENTAGE: number = 5;
export const CREDIT: number = 100;

export const enum Elements {
  Grass = 'grass',
  Rock = 'rock',
  Water = 'water',
  House = 'house',
}

export const enum Square {
  Width = 100,
  Height = 100,
}

export const prices: any = {
  [Elements.House]: {
    buy: 10,
    sell: 5,
  },
  [Elements.Water]: {
    buy: 3,
    sell: 0,
  },
  [Elements.Rock]: {
    buy: 3,
    sell: 3,
  },
  [Elements.Grass]: {
    buy: 0,
    sell: 0,
  }
};

export const tradeActions: TradeActions = {
  buy: 'buy',
  sell: 'sell',
}

export const board: BoardConfig = {
  row: 10,
  col: 10,
  pourcentageSize: 0.6,
  maxSize: 800,
};

export default board;
