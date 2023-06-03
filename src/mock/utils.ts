const  generateFakeData = (fn: Function, num: number): Array<object> => {
  let arr = []
  for (let i = 0; i < num; i++) {
    const fakeData = fn();
    arr.push(fakeData);
  }
  return arr
}

export default generateFakeData