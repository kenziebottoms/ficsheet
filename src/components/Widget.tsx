import type { PropsWithChildren } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";

type Props = PropsWithChildren & {
  title: string;
  subtitle?: string;
  className?: string;
}
const Widget = ({
  title,
  subtitle,
  className = '',
  children,
}: Props) => {
  return <ErrorBoundary>
    <div className={['rounded-lg bg-zinc-800 border-2 border-zinc-500 p-3', className].join(" ")}>
      <h4 className='mb-2'>{title}</h4>
      {subtitle && <h5>{subtitle}</h5>}
      {children}
    </div>
  </ErrorBoundary>
}

export default Widget