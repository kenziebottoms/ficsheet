import type { ReactNode } from "react";

type Props = {
  headers: (string | ReactNode)[];
  onHeaderClick?: (headerIndex: number) => void;
  data: ReactNode[][];
}
const Table = ({
  headers,
  onHeaderClick = () => { },
  data,
}: Props) => {
  return <table className="font-mono w-full rounded-xl bg-zinc-950 border-b border-primary/50">
    <thead className="font-medium rounded-t-xl">
      <tr className='rounded-t-xl bg-pink-700/50 from-30% via-80% to-90%'>
        {headers.map((header, headerIndex) => <th
          key={headerIndex}
          onClick={() => onHeaderClick(headerIndex)}
          className={[
            "whitespace-nowrap font-mono text-lg",
            headerIndex === 0 ? 'rounded-tl-xl' : '',
            (headerIndex % 2 === 0) ? "bg-pink-400/25" : "",
            headerIndex === headers.length - 1 ? 'rounded-tr-xl' : '',
          ].join(" ")}
        >
          {header}
        </th>)}
      </tr>
    </thead>
    <tbody className="font-normal rounded-b-xl">
      {data.map((row, rowIndex) => <tr
        key={rowIndex}
        className={[
          "border-x border-primary/50",
          (rowIndex + 1) % 4 === 0 ? 'bg-pink-700/20' : '',
          (rowIndex + 3) % 4 === 0 ? 'bg-orange-700/20' : '',
          rowIndex === data.length - 1 ? 'rounded-b-xl' : '',
        ].join(' ')}
      >
        {row.map((cell, cellIndex) => <td
          key={cellIndex}
          className={`${cellIndex % 2 === 0 ? "bg-pink-500/10" : ""} ${(cellIndex === 0 && rowIndex === data.length - 1) ? 'rounded-bl-xl' : ''}`}
        >
          {cell}
        </td>)}
      </tr>)}
    </tbody>
  </table>
}

export default Table