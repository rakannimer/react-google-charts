const rand = n => {
  return Math.random() * 8 * n;
};
export const generateData = () => {
  return [
    ["Age", "Weight"],
    [rand(8), rand(12)],
    [rand(4), rand(5.5)],
    [rand(1), rand(14)],
    [rand(4), rand(5)],
    [rand(3), rand(3.5)],
    [rand(6), rand(7)],
    [rand(8), rand(12)],
    [rand(4), rand(5.5)],
    [rand(1), rand(14)],
    [rand(4), rand(5)],
    [rand(3), rand(3.5)],
    [rand(6), rand(7)],
    [rand(4), rand(5.5)],
    [rand(1), rand(14)],
    [rand(4), rand(5)],
    [rand(3), rand(3.5)],
    [rand(6), rand(7)]
  ];
};
