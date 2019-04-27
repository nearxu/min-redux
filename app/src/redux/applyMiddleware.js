
// 有中间件的过程 action --> middleware(增强 dispatch 处理异步, 日志记录等) --> reducer

function applyMiddleware(...middleware) {

}

function logger({ getState }) {
  return (next) => (action) => {
    console.log('will dispatch action: ' + action);
    let returnVal = next(action);
    console.log('state after dispatch: ' + getState())
    return returnVal;
  }
}