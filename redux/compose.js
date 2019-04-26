

// compose (f1,f2,f3) translate: () => f1(f2(f3))

// some like reduce

const reducers = () => [1, 2, 3, 4].reduce((pre, cur, index, arr) => {
  console.log('pre:' + pre);
  console.log('cur:' + cur);
  return pre + cur
})
console.log(reducers());

// some curry

const curry = (a) => (b) => a + b;

console.log(curry(1)(2));

// f1 f2 f3
const toUpperCase = x => x.toUpperCase();
const addNum = x => x + '123!';
const reverseStr = x => x.split('').reverse().join('');

// simple compose , only two fn
const twoCompose = (a, b) => {
  return function (x) {
    return a(b(x))
  }
}

const two = twoCompose(toUpperCase, addNum); // fns
console.log(two('world')) // args

// es5 compose

function es5Compose(...fns) {
  return fns.reduce(function (pre, cur) {
    return function (...args) {
      return pre(cur(...args));
    }
  })
}

console.log(es5Compose(toUpperCase, addNum)('just es5 resize'));

// redux
const compose = (...fns) => {
  // 0 => fn
  if (fns.length === 0) {
    return (arg) => arg;
  }
  // 1 => fn()
  if (fns.length === 1) {
    return fns[0];
  }
  return fns.reduce((pre, cur) => (...args) => pre(cur(...args)))
}


let a0 = compose();
console.log(a0('hello'));

let a1 = compose(toUpperCase);
console.log(a1('hello'))

let a2 = compose(toUpperCase, addNum);
console.log(a2('hello'))

let a3 = compose(toUpperCase, addNum, reverseStr);
console.log(a3('hello'))

module.exports = compose;