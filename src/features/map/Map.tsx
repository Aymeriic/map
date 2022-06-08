import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { generate, selectMap } from '../map/mapSlice';
import Square from '../square/Square';

import board, { Square as SquareConfig } from '../../constants/config';

import styles from './Map.module.css';

const Map = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const map = useAppSelector(selectMap);

  useEffect(() => {
    dispatch(generate());
  }, [dispatch]);

  return (
    <div className={styles.board} style={{ width: board.col * SquareConfig.Width }}>
      {map.map((square) => <Square key={`${square.x}_${square.y}`} {...square} />)}
    </div>
  );
};

export default Map;
