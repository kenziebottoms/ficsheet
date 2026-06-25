import { useEffect, useState, type FocusEventHandler, type KeyboardEventHandler } from 'react'

type Props<T extends string | number> = {
  name: string;
  type: 'text' | 'number';
  label: string;
  defaultValue?: T;
  required?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}
const Input = <T extends string | number>({
  name,
  type,
  label,
  defaultValue,
  required,
  placeholder,
  autoFocus,
  onBlur,
  onKeyDown,
}: Props<T>) => {
  const [value, setValue] = useState<T | null>(defaultValue ?? null);

  useEffect(() => {
    if (defaultValue != null) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  return <div className='flex flex-col w-full'>
    <label>
      <div>{label}</div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value ?? ''}
        required={required}
        onChange={e => setValue(e.target.value as T)}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
        autoFocus={autoFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoComplete='off'
      />
    </label>
  </div>
}

export default Input 