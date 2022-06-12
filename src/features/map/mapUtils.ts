import board, {
  prices,
  tradeActions,
  Square as SquareConfig,
} from "../../constants/config";
import { Square } from "../../constants/map";

export function getSquareIndex(squareList: Square[], square: Square): number {
  return squareList.findIndex((sq: Square) => sq.x === square.x && sq.y === square.y)
}

export function getPriceByType(type: string, action: string): number {
  if (action === tradeActions.buy) {
    return prices[type].buy;
  }

  return prices[type].sell;
}

export function getSquareWidth(pourcentage: number): number {
  return getSquareSize(SquareConfig.Width, pourcentage);
}

export function getSquareHeight(pourcentage: number): number {
  return getSquareSize(SquareConfig.Height, pourcentage);
}

export function getSquareSize(squareSize: number, pourcentage: number): number {
  let componentSize = window.innerWidth * pourcentage;

  if (componentSize > board.maxSize) {
    componentSize = board.maxSize;
  }

  return squareSize * componentSize / (board.col * SquareConfig.Width);
}
