export const colors = ["#4f46e5", "#fb923c", "#f6339a", "#953fed"];

export const fullRainbow = [
  "#f472b6",
  "#e11d48",
  "#f97316",
  "#facc15",
  "#84cc16",
  "#059669",
  "#0ea5e9",
  "#4f46e5",
  "#c026d3",
  "#fff",
  "#000",
];

export const getDynamicColorPalette = (numberOfItems: number) => {
  if (numberOfItems > 4) {
    return fullRainbow;
  }
  return colors;
};
