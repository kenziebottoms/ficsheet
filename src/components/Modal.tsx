import { type PropsWithChildren } from 'react'

import Button from './Button';
import { ButtonBackgroundClassNames } from './constants';

type Props = PropsWithChildren & {
  className?: string;
  open: boolean;
  setOpen: (newOpen: boolean) => void;
}
const Modal = ({
  open,
  setOpen,
  className,
  children
}: Props) => {
  return <div className={['fixed z-10 inset-0 overflow-y-auto', !open && 'hidden'].join(" ")}>
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-zinc-900/75 flex flex-row justify-end" onClick={() => setOpen(false)}>
        <Button
          onClick={() => setOpen(false)}
          style="secondary"
          className='self-start'
        >
          x
        </Button>
      </div>
    </div>
    <div className={[
      'absolute mx-auto',
      className,
      ButtonBackgroundClassNames.secondary,
    ].join(" ")}>
      {children}
    </div>
  </div >
}

export default Modal