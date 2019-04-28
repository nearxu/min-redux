import React from 'react';

import { thunk } from '../react-thunk/thunk';
import { createStore, applyMiddleware } from '../redux/index';
const ADD = "ADD";
const REMOVE = "REMOVE";

// action creator

function add() {
  return {
    type: ADD
  }
}

// function setTime(n){
//   return () => {
//     setTime(() => {
//       console.log(n);
//     },3000)
//   }
// }

let initState = 10;

function counter(state = initState, action) {
  switch (action.type) {
    case ADD:
      return state + 1
    case REMOVE:
      return state - 1
    default:
      return state
  }
}

function logger({ getState }) {
  return next => action => {
    console.log('will dispath', action)
    let value = next(action);
    console.log('did dispath', getState())
    return value;
  }
}

const store = createStore(
  counter,
  applyMiddleware(thunk)
)

store.subscribe(() => {
  console.log(store.getState());
})
store.dispatch(add());

function addAsync() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add());
    }, 3000);
  };
}
store.dispatch(addAsync())


export const ThunkComponent = () => <div>hello thunk! </div>



