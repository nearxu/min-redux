import React from 'react';

import { createStore } from '../redux';

// action
const ADD = "ADD";

// 
let initState = {
  count: 0
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

const store = createStore(addCount);

store.subscribe(d => {
  console.log(d, 'd');
})

store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'ADD' })



console.log(store.getState(), 'store.getState');

export const Count = () => <div>count</div>

