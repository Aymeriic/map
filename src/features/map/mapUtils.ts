import {
  prices,
  tradeActions,
} from "../../constants/config";
import { Square } from "../../constants/map";

export function getSquareIndex(squareList: any, square: Square): number {
  return squareList.findIndex((sq: Square) => sq.x === square.x && sq.y === square.y)
}

export function getPriceByType(type: string, action: string): number {
  if (action === tradeActions.buy) {
    return prices[type].buy;
  }

  return prices[type].sell;
}
