export const colors = ["#4f46e5", "#fb923c", "#f6339a", "#0ea5e9"];

export const getDynamicColorPalette = (numberOfItems: number) => {
  if (numberOfItems > 6) {
    return [
      "#f472b6",
      "#e11d48",
      "#f97316",
      "#f2c849",
      "#84cc16",
      "#059669",
      "#23b9ff",
      "#4f46e5",
      "#c026d3",
      "#fff",
      "#8c8c98",
      "#000",
    ];
  } else if (numberOfItems > 4) {
    return ["#e11d48", "#f97316", "#facc15", "#22c55e", "#4f46e5", "#c026d3"];
  }
  return colors.slice(0, numberOfItems);
};

/**
 * Return a color at a specified point in the spectrum between colors 1 and 2
 * @param {string} color1 - The first color in the format `#ffffff`
 * @param {string} color2 - The second color in the format `#ffffff`
 * @param {number} percentage - A percentage representing where in the gradient you want the
 * color from (0 would return `c1`, and 1 would return `c2`).
 * @source https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 */
export const blendColors = (
  color1: string,
  color2: string,
  percentage: number,
) => {
  const f = parseInt(color1.slice(1), 16);
  const t = parseInt(color2.slice(1), 16);
  const R1 = f >> 16,
    G1 = (f >> 8) & 0x00ff,
    B1 = f & 0x0000ff,
    R2 = t >> 16,
    G2 = (t >> 8) & 0x00ff,
    B2 = t & 0x0000ff;
  return (
    "#" +
    (
      0x1000000 +
      (Math.round((R2 - R1) * percentage) + R1) * 0x10000 +
      (Math.round((G2 - G1) * percentage) + G1) * 0x100 +
      (Math.round((B2 - B1) * percentage) + B1)
    )
      .toString(16)
      .slice(1)
  );
};

export const MonthlyChartTabNames = ["charts", "journal", "fics"] as const;
export type MonthlyChartTabName = (typeof MonthlyChartTabNames)[number];
