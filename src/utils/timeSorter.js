const timeSorter = (arr = []) =>
  arr.sort(
    (a, b) =>
      new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
  );

export default timeSorter;
