import Button from "./Button";

type Props<T extends string> = {
  label: string;
  options: T[];
  value?: T | '';
  onChange?: (newValue: T) => void;
}
const ButtonGroup = <T extends string,>({
  label,
  options,
  value,
  onChange = () => {},
}: Props<T>) => {
  return <div className='flex flex-row bg-zinc-950 rounded-md p-2 items-center gap-2'>
    <label><div>{label}</div></label>
    {options.map(o => <Button
      key={o}
      onClick={() => onChange(o)}
      style={value === o ? 'secondary' : 'subtle'}
    >
      {o}
    </Button>)}
  </div>
}

export default ButtonGroup 