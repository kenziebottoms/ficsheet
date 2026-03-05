import FandomPie from "./FandomPie";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return <div className={["p-3 flex flex-col gap-3", className].join(" ")}>
    <h2>Charts</h2>
    <div className="flex flex-row flex-wrap gap-3">
      <FandomPie />
    </div>
  </div>
}

export default Charts