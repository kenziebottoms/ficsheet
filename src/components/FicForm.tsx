import { use, type SubmitEventHandler } from 'react';
import { DeleteForever, Task } from '@mui/icons-material';

import { DataCacheContext } from '@/contexts/DataCache/DataCacheContext';
import { YearContext } from '@/contexts/Year/YearContext';

import type { Fic } from '@/types';

import Button from './Button';
import Input from './Input';
import { deleteFic, insertFics, putFic } from '@/api';

export type FicFormValues = {
  id?: number;
  name: string;
  fandom: string;
  ship: string;
}
type Props = {
  className?: string;
  values?: Partial<Fic> | null;
  onCompleted?: (response: Fic | null) => void;
}
const FicForm = ({
  className = '',
  values,
  onCompleted: _onCompleted = () => { },
}: Props) => {
  const { year } = use(YearContext)
  const { refreshData } = use(DataCacheContext)

  const onCompleted = (response: Fic | null) => {
    if (year != null) {
      refreshData(year)
    }
    _onCompleted(response)
  }

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target).entries()) as Partial<FicFormValues>;
    const fic: Fic = {
      id: values?.id,
      name: formData.name || '',
      fandom: formData.fandom || '',
      ship: formData.ship || null,
    }

    if (fic?.id == null) {
      insertFics([fic]).then(() => onCompleted(fic))
    } else {
      putFic(fic).then(() => onCompleted(fic))
    }
  }

  return <form
    onSubmit={handleSubmit}
    className={[className, 'flex flex-col gap-4 rounded-md p-3'].join(' ')}
    tabIndex={-1}
  >
    <h3>{values?.id == null ? "Create" : "Update"} Fic</h3>
    <Input<string>
      label="Name"
      name="name"
      type="text"
      defaultValue={values?.name || ''}
      required
    />

    <Input<string>
      label="Fandom"
      name="fandom"
      type="text"
      defaultValue={values?.fandom || ''}
      required
    />

    <Input<string>
      label="Ship"
      name="ship"
      type="text"
      defaultValue={values?.ship || ''}
    />

    <Button
      type="submit"
      style="primary"
      icon={Task}
    >
      {values?.id == null ? 'Save new' : 'Update'} fic
    </Button>
    {values?.id != null && (
      <Button
        style="cautionary"
        icon={DeleteForever}
        onClick={() => deleteFic(values.id as number).then(() => onCompleted(null))}
        className='mt-4'
      >
        Delete fic
      </Button>
    )}
  </form>
}

export default FicForm