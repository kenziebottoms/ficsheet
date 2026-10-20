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
  onChange = () => { },
  className = "",
  smallButtons = false,
}: Props<T>) => {
  return <div className={className}>
    <label><div>{label}</div></label>
    <div className="bg-zinc-900 flex flex-row gap-2 px-3 py-1 rounded-full">
      {options.map(o => <Button
        key={o}
        onClick={() => onChange(o)}
        style={value === o ? 'secondary' : 'subtle'}
        small={smallButtons}
      >
        {o}
      </Button>)}
    </div>
  </div>
}

export default ButtonGroup 