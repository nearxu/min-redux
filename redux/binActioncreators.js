
// 把一个 value 为不同 action creator 的对象，
// 转成拥有同名 key 的对象。同时使用 dispatch 
// 对每个 action creator 进行包装，以便可以直接调用它们

// actions creator
const addTodo = (text) => {type:'ADD_TODO',text}

const addCreator = binActionCreators(addTodo,dispath);

function binActionCreators(creators,dispath){
    return Object.keys(creators).reduce((pre,cur) => {
        pre[cur] = binAction(creators[cur],dispath);
        return pre;
    })
}

// some one
// dispatch(action)
function binAction(creator,dispatch){
    return (...args) => dispatch(...args)
}

console.log(addCreator,'addcreator')