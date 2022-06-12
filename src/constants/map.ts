export interface BoardConfig {
  col: number;
  row: number;
  pourcentageSize: number;
  maxSize: number;
}

export interface MapState {
  value: Array<Square>;
  mapHistory: Array<{
    value: Array<Square>;
    actionName: string;
    id: number;
    credit: number;
  }>;
  currentHistoryId: number;
  type: string;
  selectedSquare: Array<number>;
  credit: number;
  isEditable: boolean;
  error: string;
}

export interface Square {
  x: number;
  y: number;
  type: string;
}

export interface TradeActions {
  buy: string;
  sell: string;
}

export default BoardConfig;
