export const makeIdParam = (numArray: number[] | string[]): string => {
  let stringIds = '';
  numArray.forEach((id, i) => {
    if (i === 0) {
      stringIds += `${id}`;
    } else {
      stringIds += `,${id}`;
    }
  });
  return stringIds;
};
