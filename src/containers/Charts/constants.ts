export const colors = ["#4f46e5", "#fb923c", "#f6339a", "#0ea5e9"];

export const getDynamicColorPalette = (numberOfItems: number) => {
  if (numberOfItems > 6) {
    return [
      "#f472b6",
      "#e11d48",
      "#f97316",
      "#facc15",
      "#84cc16",
      "#059669",
      "#23b9ff",
      "#4f46e5",
      "#c026d3",
      "#fff",
      "#000",
    ];
  } else if (numberOfItems > 4) {
    return ["#e11d48", "#f97316", "#facc15", "#22c55e", "#4f46e5", "#c026d3"];
  }
  return colors;
};

export const MonthlyChartTabNames = ["charts", "history"] as const;
export type MonthlyChartTabName = (typeof MonthlyChartTabNames)[number];
