export const rearrangeArray = <T extends unknown>(array:T[]) => array.map((value, index) => {
  const newIndex = (index + 1) % array.length;
  return array[newIndex];
});
