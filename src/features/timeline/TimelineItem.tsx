import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectHistoryId, selectHistoryItem } from "../map/mapSlice";

import styles from './TimelineItem.module.css';

type TimelineItemProps = {
  actionName: string;
  id: number;
}

export const TimelineItem = ({ actionName, id }: TimelineItemProps): JSX.Element => {
  const historyId = useAppSelector(selectHistoryId);
  const dispatch = useAppDispatch();

  const handleChangeHistory = useCallback(() => {
    dispatch(selectHistoryItem(historyId));
  }, [dispatch, historyId])

  return (
    <p onClick={handleChangeHistory} className={`timeline-item ${Number(historyId) === Number(id) ? styles.selected : ''}`}>
      {actionName}
    </p>
  );
}

export default TimelineItem;
