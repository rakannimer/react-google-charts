export const hasDOM = (window: Window) => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
