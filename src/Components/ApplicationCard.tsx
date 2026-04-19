import type { Application } from '../Interfaces/Application';
import StatusBadge from './StatusBadge';

interface ApplicationCardProps {
  application: Application;
  onEdit: (app: Application) => void;
  onDelete: (app: Application) => void;
}

function formatDeadline(iso: string): {
  label: string;
  helper: string;
  helperClass: string;
} {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const deadline = new Date(iso);
  deadline.setHours(0, 0, 0, 0);
  const diffMs = deadline.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  const label = deadline.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  let helper: string;
  let helperClass: string;
  if (diffDays === 0) {
    helper = 'today';
    helperClass = 'text-amber-600';
  } else if (diffDays > 0) {
    helper = `in ${diffDays} day${diffDays === 1 ? '' : 's'}`;
    helperClass = diffDays <= 3 ? 'text-amber-600' : 'text-slate-500';
  } else {
    const past = Math.abs(diffDays);
    helper = `${past} day${past === 1 ? '' : 's'} ago`;
    helperClass = 'text-slate-400';
  }
  return { label, helper, helperClass };
}

export default function ApplicationCard({
  application,
  onEdit,
  onDelete,
}: ApplicationCardProps) {
  const { label, helper, helperClass } = formatDeadline(application.deadline);
  const notePreview = application.notes?.split('\n')[0]?.trim();

  return (
    <div
      onClick={() => onEdit(application)}
      className="group relative cursor-pointer rounded-xl bg-white p-5 ring-1 ring-slate-200 shadow-sm hover:shadow-md hover:ring-slate-300 transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900 truncate">
              {application.company}
            </h3>
            <StatusBadge status={application.status} size="sm" />
          </div>
          <p className="mt-1 text-sm text-slate-600 truncate">
            {application.role}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(application);
          }}
          className="rounded-md p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 transition-all"
          aria-label="Delete application"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 text-slate-400"
        >
          <path
            fillRule="evenodd"
            d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5a.75.75 0 00-.75.75v7.5c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75v-7.5a.75.75 0 00-.75-.75H4.75z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-slate-700">{label}</span>
        <span className={`text-xs ${helperClass}`}>· {helper}</span>
      </div>

      {notePreview && (
        <p className="mt-3 text-sm text-slate-500 line-clamp-1 border-t border-slate-100 pt-3">
          {notePreview}
        </p>
      )}
    </div>
  );
}
