
export function createStore(reducer, enhancer) {
  // middleware enhance
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  // some error
  // let currentState = initState;
  let currentState;
  let listeners = [];

  // let currentReduce = reducer;
  function getState() {
    return currentState;
  }
  function dispatch(action) {
    currentState = reducer(currentState, action);
    // add listeners
    // for (let i = 0; i < listeners.length; i++) {
    //   const listener = listeners[i];
    //   listener();
    // }
    // simple use


    listeners.forEach(listener => listener());
    return action;
  }
  // subscribe

  function subscribe(listener) {

    listeners.push(listener);
    return function unSubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }

  // why use init first beacuse ,not ,will fist reducer will state undefined
  // so use dispatch
  dispatch({
    type: '@init/redux'
  })
  return {
    getState,
    subscribe,
    dispatch
  }
}