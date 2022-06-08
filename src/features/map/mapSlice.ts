import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import {
  board,
  CREDIT,
  Elements,
  STONES_PERCENTAGE,
  tradeActions,
} from '../../constants/config';
import { MapState, Square } from '../../constants/map';
import { getPriceByType, getSquareIndex } from './mapUtils';

export const initialState: MapState = {
  value: [],
  mapHistory: [{
    id: -1,
    value: [],
    actionName: `Init`,
    credit: CREDIT,
  }],
  currentHistoryId: -1,
  type: Elements.Grass,
  selectedSquare: [0, 0],
  credit: CREDIT,
  isEditable: true,
  error: '',
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    generate: (state): void => {
      const squares = [];

      for (let x = 0; x < board.col; x++) {
        for (let y = 0; y < board.row; y++) {
          squares.push({
            x,
            y,
            type: Math.random() * 100 > STONES_PERCENTAGE ? Elements.Grass : Elements.Rock,
          });
        }
      }

      state.value = squares;
      state.mapHistory[0].value = squares;
    },
    changeSquareType: (state, action): void => {
      state.selectedSquare = [action.payload.x, action.payload.y];

      const pos = getSquareIndex(state.value, action.payload);

      if (state.value[pos].type === Elements.Grass && state.type !== Elements.Grass) {
        if ((state.credit - getPriceByType(state.type, tradeActions.buy)) > -1) {
          state.credit -= getPriceByType(state.type, tradeActions.buy);
          state.value[pos].type = state.type;
          state.currentHistoryId += 1;
          state.mapHistory = [...state.mapHistory, {
            id: state.mapHistory.length - 1,
            value: state.value,
            actionName: `Placed ${state.type} on ${action.payload.x}, ${action.payload.y}`,
            credit: state.credit,
          }];
        } else {
          state.error = 'You dont have enough money !';
        }
      }
    },
    selectSquareType: (state, action): void => {
      state.type = action.payload.type;
    },
    remove: (state, action): void => {
      const pos = getSquareIndex(state.value, action.payload);

      switch (state.value[pos].type) {
        case Elements.House:
        case Elements.Rock:
          state.credit += getPriceByType(state.value[pos].type, tradeActions.sell);
          state.currentHistoryId += 1;
          state.mapHistory = [...state.mapHistory, {
            id: state.mapHistory.length - 1,
            value: state.value,
            actionName: `Removed ${state.value[pos].type} on ${action.payload.x}, ${action.payload.y}`,
            credit: state.credit,
          }];
          state.value[pos].type = Elements.Grass;
          break;
        default:
          // Show error: "You cant remove this square."
          break;
      }
    },
    selectHistoryItem: (state, action): void => {
      if (state.mapHistory.length > action.payload) {
        state.currentHistoryId = action.payload;
        const historyItem = state.mapHistory.find(({ id }) => id === action.payload);

        if (historyItem) {
          state.value = historyItem.value;
          state.credit = historyItem.credit;
        }
      }

      if (state.mapHistory.length - 2 > action.payload) {
        state.isEditable = false;
      } else {
        state.isEditable = true;
      }
    }
  },
});

export const { generate, changeSquareType, remove, selectSquareType, selectHistoryItem } = mapSlice.actions;

export const selectMap = (state: RootState): Array<Square> => state.map.value;
export const selectCredit = (state: RootState): number => state.map.credit;
export const selectIsEditable = (state: RootState): boolean => state.map.isEditable;
export const selectHistoryId = (state: RootState): number => state.map.currentHistoryId;
export const selectHistory = (state: RootState) => state.map.mapHistory;
export const selectSquare = (x: number, y: number) => (state: RootState): Square | undefined => state.map.value.find((square) => square.x === x && square.y === y);
export const selectedSquare = (state: RootState): Square | undefined => state.map.value.find(val => val.x === state.map.selectedSquare[0] && val.y === state.map.selectedSquare[1]);

export default mapSlice.reducer;
