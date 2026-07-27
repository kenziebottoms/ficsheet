import { useEffect, type PropsWithChildren } from 'react'

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

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // don't do anything else with the escape key
      e.stopPropagation()
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  if (!open) return null;

  return <div className='fixed z-10 inset-0 overflow-y-auto'>
    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
      <div className="absolute inset-0 bg-zinc-900/75 flex flex-row justify-end" onClick={() => setOpen(false)}>
      </div>
    </div>
    <div className={[
      'absolute mx-auto top-1/8 left-1/4 w-1/2 p-3 rounded-lg',
      className,
      ButtonBackgroundClassNames.secondary,
    ].join(" ")}>
      <Button
        onClick={() => setOpen(false)}
        style="secondary"
        className='right-0 top-0 -mr-11 absolute'
        small
      >
        x
      </Button>
      {children}
    </div>
  </div >
}

export default Modal