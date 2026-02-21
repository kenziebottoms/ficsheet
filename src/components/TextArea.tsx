import { useState } from 'react'

type Props = {
  name: string;
  label: string;
  placeholder?: string;
}
const TextArea = ({
  name,
  label,
  placeholder,
}: Props) => {
  const [value, setValue] = useState('');

  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
        rows={4}
        className='w-full rounded-md p-2 border-2 border-primary focus-within:border-primary-highlight outline-0'
      />
    </label>
  </div>
}

export default TextArea 