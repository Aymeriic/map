import { store } from '../../app/store';
import board, { Elements } from '../../constants/config';
import { getSquareIndex } from './mapUtils';

import { generate, initialState, changeSquareType, remove, selectSquareType, selectHistoryItem } from './mapSlice';

const coord = {
  x: 0,
  y: 0,
};

describe('Map redux state tests', () => {
  it('Should have a valid initialstate', () => {
    const state = store.getState().map;
    expect(state).toEqual(initialState);
  });

  it('Should generate the map correctly', () => {
    const state = store.getState().map;
    expect(state.value.length).toEqual(0);
    store.dispatch(generate());
    expect(store.getState().map.value.length).toEqual(board.col * board.row);
  });

  it('Should change selected type', () => {
    const types = [Elements.House, Elements.Rock, Elements.Grass, Elements.Water];

    for (const type of types) {
      store.dispatch(selectSquareType({ type }));
      expect(store.getState().map.type).toEqual(type);
    }
  });

  it('Should remove square type', () => {
    const state = store.getState().map;
    store.dispatch(remove(state.value[0]));
    store.dispatch(remove(state.value[1]));
    store.dispatch(remove(state.value[2]));

    store.dispatch(selectSquareType({ type: Elements.House }));
    store.dispatch(changeSquareType(coord));
    store.dispatch(changeSquareType({ x: 0, y: 1 }));
    store.dispatch(changeSquareType({ x: 0, y: 2 }));

    const squares = store.getState().map.value.filter(square => square.type === Elements.Rock || square.type === Elements.House);

    for (const square of squares) {
      store.dispatch(remove(square));
      const newState = store.getState().map;
      const index = getSquareIndex(newState.value, square);
      expect(newState.value[index]).toEqual({ ...square, type: Elements.Grass });
    }
  });

  it('Should change square type', () => {
    store.dispatch(remove(store.getState().map.value[0]));
    expect(store.getState().map.value[0]).toEqual({ x: 0, y: 0, type: Elements.Grass });

    store.dispatch(selectSquareType({ type: Elements.House }));
    store.dispatch(changeSquareType(coord));
    expect(store.getState().map.value[0]).toEqual({ x: 0, y: 0, type: Elements.House });

    store.dispatch(selectSquareType({ type: Elements.Grass }));
    store.dispatch(changeSquareType(coord));
    expect(store.getState().map.value[0]).toEqual({ x: 0, y: 0, type: Elements.House });
  });

  it('Should not remove water square type', () => {
    store.dispatch(selectSquareType({ type: Elements.Water }));
    store.dispatch(changeSquareType(coord));
    store.dispatch(changeSquareType({ x: 1, y: 0 }));
    store.dispatch(changeSquareType({ x: 2, y: 0 }));

    const squares = store.getState().map.value.filter(square => square.type === Elements.Water);

    for (const square of squares) {
      store.dispatch(remove(square));
      const newState = store.getState().map;
      const index = getSquareIndex(newState.value, square);
      expect(newState.value[index]).toEqual({ ...square, type: Elements.Water });
    }
  });

  it('Should select history id & update map', () => {
    const state = store.getState().map;
    store.dispatch(selectSquareType({ type: Elements.House }));
    const currentId = state.currentHistoryId;

    const square = state.value.find(sq => sq.type === Elements.Grass);
    store.dispatch(changeSquareType({ x: square?.x, y: square?.y }));
    expect(store.getState().map.currentHistoryId).toEqual(currentId + 1);
    const currentValue = store.getState().map.value;

    store.dispatch(remove({ x: square?.x, y: square?.y }));
    expect(store.getState().map.currentHistoryId).toEqual(currentId + 2);

    expect(currentValue).not.toBe(store.getState().map.value);
    store.dispatch(selectHistoryItem(currentId + 1));
    expect(currentValue).toEqual(store.getState().map.value);
  });
});
