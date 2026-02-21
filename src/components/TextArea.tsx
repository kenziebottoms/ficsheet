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
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      />
      <div className='color-secondary text-right'>{value.trim().split(' ').length} word{value.split(' ').length !== 1 ? 's' : ''}</div>
    </label>
  </div>
}

export default TextArea 