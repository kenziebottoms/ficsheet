import { useState } from 'react';
import { Login, PersonAdd, Visibility } from '@mui/icons-material';

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import AuthForm from '@/forms/AuthForm';

const WelcomeModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}) => {
  const [activeFormType, setActiveFormType] = useState<'signup' | 'login' | null>(null);

  return <Modal
    open={open}
    setOpen={setOpen}
  >
    {activeFormType != null && <AuthForm
      className='bg-zinc-800'
      signUp={activeFormType === 'signup'}
      onCompleted={() => setActiveFormType(null)}
    />}
    {activeFormType == null && <>
      <div className="text-lg text-center mb-2">Are you new here?</div>
      <div className='bg-zinc-900 p-2 rounded-lg flex flex-row flex-wrap items-stretch h-20 gap-2'>
        <Button
          style="secondary"
          icon={Login}
          className='grow'
          onClick={() => setActiveFormType('login')}
        >
          Log in
        </Button>
        <Button
          style="primary"
          icon={PersonAdd}
          className='grow'
          onClick={() => setActiveFormType('signup')}
        >
          Sign up
        </Button>
        <Button
          style="subtle"
          onClick={() => setOpen(false)}
          icon={Visibility}
          className='grow'
        >
          Guest mode
        </Button>
      </div>
    </>}
  </Modal>
}

export default WelcomeModal