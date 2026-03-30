import Switch, { type SwitchProps } from '@mui/material/Switch'

type Props = {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
  className?: string;
} & Partial<Omit<SwitchProps, 'onChange'>>;
const Toggle = ({
  label,
  value,
  onChange,
  className = '',
  ...props
}: Props) => {
  return <label className={['flex flex-row items-center gap-1 cursor-pointer disabled:cursor-not-allowed', className].join(" ")}>
    {label}
    <Switch
      aria-label={label}
      color="warning"
      checked={value}
      onChange={e => onChange(e.target.checked)}
      {...props}
    />
  </label>
}

export default Toggle