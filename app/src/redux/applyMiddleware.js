
import { compose } from './compose';

export function applyMiddleware(...middlewares) {
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



// 没有中间件的过程 action --> reducer
// 有中间件的过程 action --> middleware(增强 dispatch 处理异步, 日志记录等) --> reducer
// export function applyMiddleware(...middlewares) {
//   // 返回上面实现的 createStore 函数
//   // ...args 代表所有往 createStore 传入的参数即: reducer
//   return createStore => (...args) => {
//     const store = createStore(...args)
//     let dispatch = store.dispatch
//     // midApi 暴露, 以实现本体 createStore 基本功能
//     const midApi = {
//       getState: store.getState,
//       dispatch: (...args) => dispatch(...args)
//     }
//     const middlewareChain = middlewares.map(middleware => {
//       return middleware(midApi)// 执行中间件代码, 增强处理(处理异步, 特殊功能定制)
//     })
//     // 对每个中间件的传入 store.dispatch, 即中间件中的 next
//     // 最终: middleware(midApi)(store.dispatch)(action)
//     dispatch = compose(...middlewareChain)(store.dispatch)
//     return {
//       ...store,
//       dispatch // 使用能力增强的 dispatch 覆盖掉原装 store 中的 dispatch
//     }
//   }
// }