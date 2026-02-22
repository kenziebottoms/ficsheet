import FandomPie from "./FandomPie";

type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return <div className={["p-3", className].join(" ")}>
    <h2>Charts</h2>
    <FandomPie />
  </div>
}

export default Charts