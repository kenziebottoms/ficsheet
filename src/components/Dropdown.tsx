import { useEffect, useState } from "react";

type Props<T extends string | number> = {
  name: string;
  label: string;
  placeholder?: string;
  options: T[];
  defaultValue?: T;
}
const Dropdown = <T extends string | number,>({
  name,
  label,
  placeholder,
  options,
  defaultValue,
}: Props<T>) => {
  const [value, setValue] = useState<T | null>(defaultValue ?? null);

  useEffect(() => {
    if (defaultValue != null) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <select
        name={name}
        value={value ?? ''}
        onChange={e => setValue(e.target.value as T)}
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