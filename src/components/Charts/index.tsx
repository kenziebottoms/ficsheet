type Props = {
  className?: string;
}
const Charts = ({
  className = ''
}: Props) => {
  return <div className={["p-3", className].join(" ")}>
    <h2>Charts</h2>
  </div>
}

export default Charts