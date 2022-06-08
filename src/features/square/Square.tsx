import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Square as SquareConfig } from '../../constants/config';
import { selectIsEditable, selectSquare } from '../map/mapSlice';

import {
  changeSquareType,
} from '../map/mapSlice';

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
      // -4 For the border size
      style={{ width: SquareConfig.Width - 2, height: SquareConfig.Height - 2 }}
    >
      {null}
    </div>
  );
}

export default Square;
