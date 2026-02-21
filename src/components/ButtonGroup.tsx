import Button from "./Button";

type Props<T extends string> = {
  label: string;
  options: T[];
  value?: T | '';
  onChange?: (newValue: T) => void;
  className?: string;
  smallButtons?: boolean;
}
const ButtonGroup = <T extends string,>({
  label,
  options,
  value,
  onChange = () => {},
  className = "",
  smallButtons = false,
}: Props<T>) => {
  return <div className={['flex flex-row', className].join(' ')}>
    <label><div>{label}</div></label>
    {options.map(o => <Button
      key={o}
      onClick={() => onChange(o)}
      style={value === o ? 'secondary' : 'subtle'}
      small={smallButtons}
    >
      {o}
    </Button>)}
  </div>
}

export default ButtonGroup 