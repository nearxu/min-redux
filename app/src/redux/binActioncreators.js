// 把一个 value 为不同 action creator 的对象，
// 转成拥有同名 key 的对象。同时使用 dispatch 
// 对每个 action creator 进行包装，以便可以直接调用它们

export function binActionCreators(creators, dispath) {
  return Object.keys(creators).reduce((pre, cur) => {
    pre[cur] = binAction(creators[cur], dispath);
    return pre;
  })
}

// some one
// dispatch(action)
function binAction(creator, dispatch) {
  return (...args) => dispatch(...args)
}