import { useState } from 'react'

type Props = {
  name: string;
  label: string;
  defaultValue?: Date;
}
const DateInput = ({
  name,
  label,
  defaultValue,
}: Props) => {
  const [value, setValue] = useState<string>((defaultValue || new Date()).toLocaleDateString('en-CA'));

  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <input
        type="date"
        name={name}
        value={value}
        onChange={e => setValue(e.target.value)}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      />
    </label>
  </div>
}

export default DateInput 