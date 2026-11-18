export const copy = (text: string) =>
  navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": text,
    }),
  ]);
export const copyPrettyJson = (json: object) =>
  copy(JSON.stringify(json, undefined, 2));

export const countWords = (input?: string | null) => {
  if (!input || input === " ") {
    return 0;
  }
  const pastedWords = input
    // remove #(#)/#(#) date stamps
    .replace(/\b\d{1,2}\/\d{1,2}\b/, "")
    .trim();
  return pastedWords.split(/\s+/g).length;
};

export const getMedian = (data: number[]) => {
  const sortedData = data.slice().sort((a, b) => a - b);
  if (sortedData.length % 2 === 0) {
    return (
      (sortedData[sortedData.length / 2] +
        sortedData[sortedData.length / 2 - 1]) /
      2
    );
  } else {
    return sortedData[(sortedData.length - 1) / 2];
  }
};

export const largeNumberFormatter = (x: string) => {
  const number = parseInt(x, 10) ?? 0;
  return number >= 1000
    ? `${(number / 1000).toFixed(1).replace(".0", "")}k`
    : `${number}`;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
