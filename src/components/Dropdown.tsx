import { useEffect, useState } from "react";
import _ from "lodash";

import type { DropdownOption } from "@/types";

type Props<T extends string | number> = {
  name: string;
  label: string;
  placeholder?: string;
  options: (T | DropdownOption<T>)[];
  defaultValue?: T | null;
}
const Dropdown = <T extends string | number>({
  name,
  label,
  placeholder,
  options: _options,
  defaultValue,
}: Props<T>) => {
  const [value, setValue] = useState<T | null>(defaultValue ?? null);

  useEffect(() => {
    if (defaultValue != null) {
      setValue(defaultValue)
    }
  }, [defaultValue])

  const options: DropdownOption<T>[] = _options.map(option => {
    return {
      value: (_.get(option, 'value') ?? option) as T,
      label: _.get(option, 'label') as string ?? `${option}`,
    }
  })

  return <div className='flex flex-col w-full'>
    <label>
      <div>{label}</div>
      <select
        name={name}
        value={value ?? ''}
        onChange={e => setValue(e.target.value as T)}
        className='w-full rounded-md p-2 border-2 border-primary/50 focus-within:border-primary outline-0'
      >
        <option value="">{placeholder}</option>
        {options.map((o, i) => <option key={i} value={o.value}>
          {o.label}
        </option>)}
      </select>
    </label>
  </div>
}

export default Dropdown 