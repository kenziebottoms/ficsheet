import { useState, type HTMLInputTypeAttribute } from 'react'

type Props = {
  name: string;
  type: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
}
const Input = ({
  name,
  type,
  label,
  placeholder,
}: Props) => {
  const [value, setValue] = useState('');

  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      />
    </label>
  </div>
}

export default Input 