export const emptyArray = []

export const points = [...Array(10)].reduce((result: number[], _, idx) => {
  result[idx] = idx < 3
    ? idx
    : result[idx - 2] + result[idx -1]

  return result
}, [])