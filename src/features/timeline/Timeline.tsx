import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHistory, selectHistoryId, selectHistoryItem } from '../map/mapSlice';
import TimelineItem from './TimelineItem';
import board, { Square } from '../../constants/config';

import styles from './Timeline.module.css';

export const Timeline = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const historyId = useAppSelector(selectHistoryId);
  const history = useAppSelector(selectHistory);

  const handleChangeHistory = useCallback((type: string) => () => {
    dispatch(selectHistoryItem(historyId + (type === 'previous' ? -1 : 1)));
  }, [dispatch, historyId])

  return (
    <div className={styles.timeline} style={{ height: board.row * Square.Height }}>
      <div className={styles.buttons}>
        <button
          disabled={historyId < 0}
          onClick={handleChangeHistory('previous')
        }>
          Previous
        </button>
        <button
          disabled={historyId > history.length - 3}
          onClick={handleChangeHistory('next')
        }>
          Next
        </button>
      </div>
      <h3>History</h3>
      {history.map(item => <TimelineItem key={item.id} {...item} />)}
    </div>
  );
}

export default Timeline;
