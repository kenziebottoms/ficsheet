import type { SubmitEventHandler } from 'react';

import Button from '../components/Button';
import Dropdown from '../components/Dropdown';
import Input from '../components/Input';
import TextArea from '../components/TextArea';

const DailyProjectWordCountForm = () => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
  }

  return <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-zinc-900 rounded-md p-2'>
    <Input
      label="Project name"
      name="projectName"
      type="text"
    />
    <Dropdown
      label="Fandom"
      placeholder='Select a fandom'
      name="fandom"
      options={[
        "Inception",
        "Mad Max"
      ]}
    />
    <TextArea
      label="Words written"
      name="pastedWords"
    />
    <Button type="submit">Log word count</Button>
  </form>
}

export default DailyProjectWordCountForm