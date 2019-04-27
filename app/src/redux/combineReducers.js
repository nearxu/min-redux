
// return reducer1 reducer2
export function combineReducers(reducers) {
  const reducersKeys = Object.keys(reducers);
  let finalReducer = {};
  for (let i = 0; i < reducersKeys.length; i++) {
    const key = reducersKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducer[key] = reducers[key]
    }
  }
  // delete not function
  const finalReducerKeys = Object.keys(finalReducer);

  return function combination(state = {}, action) {

    let hasChange = false;
    const nextState = {};

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducer[key];

      const preState = state[key];
      const nextStateFork = reducer(preState, action);
      if (typeof nextStateFork === 'undefined') {
        throw new ErrorEvent('nextStateFork undefiend');
      }
      nextState[key] = nextStateFork;
      hasChange = hasChange || nextStateFork !== preState
    }
    return hasChange ? nextState : state
  }
}