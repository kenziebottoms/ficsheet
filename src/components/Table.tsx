import type { ReactNode } from "react";

type Props = {
  headers: string[];
  data: ReactNode[][];
}
const Table = ({
  headers,
  data,
}: Props) => {
  return <table className="font-mono w-full rounded-t-xl bg-zinc-950">
    <thead className="font-medium">
      <tr className='rounded-t-xl bg-pink-700/50 from-30% via-80% to-90%'>
        {headers.map((header, headerIndex) => <th
          key={header}
          className={[
            "whitespace-nowrap font-mono text-lg",
            (headerIndex % 2 === 0) ? "bg-pink-400/25" : "",
          ].join(" ")}
        >
          {header}
        </th>)}
      </tr>
    </thead>
    <tbody className="font-normal">
      {data.map((row, rowIndex) => <tr
        key={rowIndex}
        className={[
          "border-x border-primary/50",
          (rowIndex + 1) % 4 === 0 ? 'bg-pink-700/20' : '',
          (rowIndex + 3) % 4 === 0 ? 'bg-orange-700/20' : '',
        ].join(' ')}
      >
        {row.map((cell, cellIndex) => <td
          key={cellIndex}
          className={[
            (cellIndex % 2 === 0) ? "bg-pink-500/10" : "",
          ].join(" ")}
        >
          {cell}
        </td>)}
      </tr>)}
    </tbody>
  </table>
}

export default Table