
export const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    // 把 dispatch 的能力交给函数内部处理, 通常用来处理异步
    return action(dispatch, getState)
  }
  // 不是函数, 那么直接 dispatch
  return next(action)
}