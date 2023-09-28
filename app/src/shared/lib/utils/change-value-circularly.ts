export const changeValueCircularly =
  (count: number) => (currentIndex: number, length: number) => {
    const result = [currentIndex];
    let next = currentIndex;

    for (let i = 2; i <= count; i++) {
      next = (next + 1) % length;
      result.push(next);
    }

    return result;
  };
