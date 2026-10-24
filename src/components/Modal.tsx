import { useEffect, useState, type PropsWithChildren } from 'react'
import { Close } from '@mui/icons-material';

import Button from '@/components/Button';

import { ButtonBackgroundClassNames } from './constants';

type Props = PropsWithChildren & {
  open: boolean;
  setOpen: (newOpen: boolean) => void;
  className?: string;
}
const Modal = ({
  open: isRendered,
  setOpen: setIsRendered,
  className,
  children
}: Props) => {
  /**
   * Manage visibility independently of render status so that both the
   * pre- and post-transition class names for animation are rendered.
   */
  const [isVisible, setIsVisible] = useState(false)

  const closeModal = () => setIsVisible(false);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      // don't do anything else with the escape key
      e.stopPropagation()
      closeModal();
    }
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(isRendered), 100)
    if (isRendered) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isRendered]);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => setIsRendered(false), 100)
    }
  }, [isVisible])

  if (!isVisible && !isRendered) return null;

  const isOpeningOrClosing = !isVisible || !isRendered

  return <div className='fixed z-10 inset-0 overflow-y-auto'>
    <div className={`fixed inset-0 transition-opacity duration-100 ${isOpeningOrClosing ? 'opacity-0' : 'opacity-75'}`} aria-hidden="true">
      <div className="absolute inset-0 bg-zinc-900 flex flex-row justify-end" onClick={closeModal}>
      </div>
    </div>
    <div className={[
      `absolute mx-auto top-1/8 left-1/4 w-1/2 p-3 rounded-lg transition-all duration-100`,
      isOpeningOrClosing ? 'opacity-0 translate-y-0' : 'opacity-100 -translate-y-4',
      className,
      ButtonBackgroundClassNames.secondary,
    ].join(" ")}>
      <Button
        onClick={closeModal}
        style="secondary"
        className='right-0 top-0 -mr-11 absolute pl-1 pt-1 pr-1 pb-1'
        small
      >
        <Close />
      </Button>
      {children}
    </div>
  </div >
}

export default Modal