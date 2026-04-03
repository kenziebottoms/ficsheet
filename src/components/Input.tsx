import { useEffect, useState } from 'react'

type Props<T extends string | number> = {
  name: string;
  type: 'text' | 'number';
  label: string;
  defaultValue?: T;
  placeholder?: string;
}
const Input = <T extends string | number>({
  name,
  type,
  label,
  defaultValue,
  placeholder,
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
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        onChange={e => setValue(e.target.value as T)}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      />
    </label>
  </div>
}

export default Input 