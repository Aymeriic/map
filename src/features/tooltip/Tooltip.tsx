import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { tradeActions } from "../../constants/config";
import { remove, selectedSquare } from "../map/mapSlice";
import { getPriceByType } from "../map/mapUtils";
import ToolItem from "../toolbox/ToolItem";

import styles from './Tooltip.module.css';

export const Tooltip = (): JSX.Element => {
  const square = useAppSelector(selectedSquare);
  const dispatch = useAppDispatch();

  const handleClick = useCallback(() => {
    dispatch(remove(square));
  }, [dispatch, square]);

  if (!square) {
    return <p>No square selected</p>;
  }

  return (
    <div className={styles.tooltip}>
      <h3>Current tile :</h3>
      <div className={styles.squareContainer}>
        <ToolItem type={square.type} />
        <p>(position: ({square.x}, {square.y}))</p>
      </div>
      <p>Action : <button onClick={handleClick}>Remove (+{getPriceByType(square.type, tradeActions.sell)} credit)</button></p>
    </div>
  );
};

export default Tooltip;
