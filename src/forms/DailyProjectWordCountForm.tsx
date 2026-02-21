import type { SubmitEventHandler } from 'react';

import TextArea from '../components/TextArea';

const DailyProjectWordCountForm = () => {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = e => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData);
  }

  return <form onSubmit={handleSubmit}>
    <TextArea
      label="Words written"
      name="pastedWords"
    />
  </form>
}

export default DailyProjectWordCountForm