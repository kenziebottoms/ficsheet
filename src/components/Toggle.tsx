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
  return <label className={['flex flex-row gap-2', className].join(" ")}>
    {label}
    <Switch
      aria-label={label}
      color="secondary"
      value={value}
      onChange={e => onChange(e.target.checked)}
      defaultChecked
      {...props}
    />
  </label>
}

export default Toggle