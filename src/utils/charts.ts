import type { Bin } from "@/types";

/**
 * @source https://mui.com/x/react-charts/bar-demo/#histogram
 */
export const computeHistogramBins = (
  values: number[],
  binCount: number,
): Bin[] => {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = (max - min) / binCount;

  const bins = Array.from({ length: binCount }, (_bin, i) => ({
    x0: min + i * step,
    x1: min + (i + 1) * step,
    count: 0,
  }));

  for (const value of values) {
    const index = Math.min(Math.floor((value - min) / step), binCount - 1);
    bins[index].count += 1;
  }
  return bins.map((bin) => ({
    bin: `${bin.x0.toFixed(1)}-${bin.x1.toFixed(1)}`,
    count: bin.count,
  }));
};
