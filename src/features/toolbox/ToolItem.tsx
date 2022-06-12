import React, { useCallback } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { selectSquareType } from "../map/mapSlice";

import toolStyles from './ToolItem.module.css';
import mapStyles from '../map/Map.module.css';

type ToolItemProps = {
  type: string;
  editable?: boolean;
};

export const ToolItem = ({ type, editable = false }: ToolItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    if (editable) {
      dispatch(selectSquareType({ type }));
    }
  }, [dispatch, type, editable]);

  return (
    <div onClick={handleClick}>
      <div className={`${toolStyles['tool-item-block']} ${mapStyles[type]}`}></div>
      <p className={toolStyles.p}>{type}</p>
    </div>
  )
};

export default ToolItem;
