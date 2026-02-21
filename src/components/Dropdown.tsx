type Props<T extends string> = {
  name: string;
  label: string;
  placeholder?: string;
  options: T[];
  value?: T | '';
  onChange?: (newValue: T) => void;
}
const Dropdown = <T extends string,>({
  name,
  label,
  placeholder,
  options,
  value,
  onChange,
}: Props<T>) => {

  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <select
        name={name}
        value={value}
        onChange={onChange ? e => onChange(e.target.value as T) : undefined}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>
          {o}
        </option>)}
      </select>
    </label>
  </div>
}

export default Dropdown 