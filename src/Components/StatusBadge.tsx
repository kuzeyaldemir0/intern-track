import type { Status } from '../Interfaces/Status';

interface StatusBadgeProps {
  status: Status;
  size?: 'sm' | 'md';
}

const styles: Record<Status, string> = {
  Applied: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Interview: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Offer: 'bg-green-50 text-green-700 ring-green-600/20',
  Rejected: 'bg-red-50 text-red-700 ring-red-600/20',
  Ghosted: 'bg-slate-100 text-slate-600 ring-slate-500/20',
};

const dotStyles: Record<Status, string> = {
  Applied: 'bg-blue-500',
  Interview: 'bg-amber-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
  Ghosted: 'bg-slate-400',
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const sizeClass =
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ring-1 ring-inset ${styles[status]} ${sizeClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  );
}
