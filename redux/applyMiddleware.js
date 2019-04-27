
const chain1 = (next) => (action) => {
  console.log('before action1')
  const returnVal = next(action);
  console.log('after action1')
  return returnVal
}

const chain2 = (next) => (action) => {
  console.log('before action2')
  const returnVal = next(action);
  console.log('after action2')
  return returnVal
}

const funs = [chain1, chain2];

const compose = funs.reduce((pre, cur) => {
  return function () {
    return pre(cur.apply(undefined, arguments))
  }
})

const dispatch = (action) => {
  console.log('this dispatch')
  return 'reducer result'
}

const lastFn = compose(dispatch)({ type: 'some action' });


