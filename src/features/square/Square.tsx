import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsEditable, selectSquare } from '../map/mapSlice';
import {
  changeSquareType,
} from '../map/mapSlice';
import { getSquareHeight, getSquareWidth } from '../map/mapUtils';
import board from '../../constants/config';

import squareStyles from './Square.module.css';
import mapStyles from '../map/Map.module.css';

type SquareProps = {
  x: number;
  y: number;
};

export function Square({ x, y }: SquareProps): JSX.Element {
  const square = useAppSelector(selectSquare(x, y));
  const isEditable = useAppSelector(selectIsEditable);
  const dispatch = useAppDispatch();

  const eventClick = useCallback(() => {
    if (isEditable) {
      dispatch(changeSquareType({ x, y }));
    }
  }, [dispatch, isEditable, x, y]);

  return (
    <div
      onClick={eventClick}
      className={[squareStyles.square, square && mapStyles[square.type]].join(' ')}
      // -2 For the border size. 4 sides : -4px.
      style={{ width: getSquareWidth(board.pourcentageSize) - 2, height: getSquareHeight(board.pourcentageSize) - 2 }}
    >
      {null}
    </div>
  );
}

export default Square;
