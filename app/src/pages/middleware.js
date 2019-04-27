import React from 'react';

// js 单线程 function 是同步的 先进后出
function context(n) {
  if (n < 0) return;
  console.log(n);
  context(n - 1);
  console.log(n);
}

console.log(context(3)); // 3 2 1 1 2 3


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

const chain3 = (next) => (action) => {
  console.log('before action3')
  const returnVal = next(action);
  console.log('after action3')
  return returnVal
}

const funs = [chain1, chain2, chain3];
// const compose1 = (a) => (b) => a + b;

// console.log(compose1(1)(2));

const compose = funs.reduce((pre, cur) => {
  console.log(pre, 'pre')
  return function () {
    return pre(cur.apply(undefined, arguments))
  }
})

// 1
// () => f1(f2(arguments))

// 2
// () => f1(f2(f3()))

// 3
// () => () => f1(f2(f3()))

// 4 
// last = compose()(action)

// dispatch = function (action) {
//   console.log('fn1');
//   (function (action) {
//       console.log('fn2');
//       (function (action) {
//           console.log('fn3');
//           dispatch(action);
//           console.log('fn3'); 
//       })(action);
//       console.log('fn2');
//   })(action);
//   console.log('fn1');
// }

// (dispatch) => (action) => {
//   funs[0](funs[0](action))
// }


const dispatch = (action) => {
  console.log('this dispatch')
  return 'reducer result'
}

const lastFn = compose(dispatch)({ type: 'some action' });

export const Middleware = () => <div>hello Middleware</div>