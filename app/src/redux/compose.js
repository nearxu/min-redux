
export const compose = (...fns) => {
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