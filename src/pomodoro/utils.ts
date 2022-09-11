export function createMemoFunction<A, R>(method: (arg: A) => R): (arg: A) => R {
  let previousArg: any
  let previousResult: any
  return function (arg) {
    if (previousArg === arg) {
      return previousResult
    }

    previousResult = method(arg)
    previousArg = arg
    return previousResult
  }
}
