import { useState } from 'react'
import { format, parse } from 'date-fns';

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
  const [value, setValue] = useState<Date | null>(defaultValue || new Date());

  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <input
        type="date"
        name={name}
        value={value == null ? '' : format(value, "yyyy-MM-dd")}
        onChange={e => e.target.value === '' ? null : setValue(parse(e.target.value, 'yyyy-MM-dd', new Date()))}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      />
    </label>
  </div>
}

export default DateInput 