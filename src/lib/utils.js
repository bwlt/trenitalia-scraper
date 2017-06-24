// @flow


export function times(n: number) {
  const arr: number[] = []

  for (let i = 0; i < n; i++) {
    arr.push(i)
  }

  return arr
}



export function invariant(condition: mixed, message: string) {
  if (!condition) throw new Error(message)
}
