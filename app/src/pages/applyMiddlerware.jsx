import React from 'react';
import { compose, createStore } from '../redux';

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch action: ' + action);
    let returnVal = next(action);
    console.log('state after dispatch: ' + getState())
    return returnVal;
  }
}

// action
const ADD = 'ADD';

let initState = {
  count: 1
}

// reducer
const addCount = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      return { ...state, count: state.count + 1 }
    default:
      return state;
  }
}

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, enhancer) => {
    const store = createStore(reducer, enhancer);
    let dispatch = store.dispatch;
    let chain = [];

    const middlewareApi = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }

    chain = middlewares.map(middleware => middleware(middlewareApi))

    dispatch = compose(...chain)(store.dispatch);
    // dispatch
    // action => {
    //   console.log('will dispatch action: ' + action);
    //   let returnVal = next(action);
    //   console.log('state after dispatch: ' + getState());
    //   return returnVal;
    // }
    return {
      ...store,
      dispatch
    }
  }
}

// const store = createStore(
//   reducers,
//   applyMiddleware(logger)
// )

const store = createStore(
  addCount,
  applyMiddleware(logger)
)

store.dispatch({ type: 'ADD' });

console.log(store.getState(), 'getState')

function createThunk() {

}

export const Middle = () => <div>hello middle</div>