type Props = {
  name: string;
  label: string;
  placeholder?: string;
  options: string[];
}
const Dropdown = ({
  name,
  label,
  placeholder,
  options,
}: Props) => {
  return <div className='flex flex-col'>
    <label>
      <div>{label}</div>
      <select
        name={name}
        className='w-full rounded-md p-2 border-2 border-primary focus-within:border-primary-highlight outline-0'
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