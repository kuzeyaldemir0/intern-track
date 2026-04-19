import { useMemo, useState } from 'react';
import type { Application } from '../Interfaces/Application';
import type { Status } from '../Interfaces/Status';
import { STATUSES } from '../Interfaces/Status';
import type { ApplicationFormData } from '../Components/ApplicationForm';
import ApplicationCard from '../Components/ApplicationCard';
import StatsHeader from '../Components/StatsHeader';
import Button from '../Components/Button';
import ConfirmDialog from '../Components/ConfirmDialog';
import AddApplicationPage from './AddApplicationPage';
import EditApplicationPage from './EditApplicationPage';

interface DashboardProps {
  applications: Application[];
  onAdd: (data: ApplicationFormData) => void;
  onUpdate: (id: string, data: ApplicationFormData) => void;
  onDelete: (id: string) => void;
}

type Filter = 'All' | Status;
const FILTERS: Filter[] = ['All', ...STATUSES];

export default function Dashboard({
  applications,
  onAdd,
  onUpdate,
  onDelete,
}: DashboardProps) {
  const [filter, setFilter] = useState<Filter>('All');
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);
  const [deleting, setDeleting] = useState<Application | null>(null);

  const filtered = useMemo(() => {
    const list =
      filter === 'All'
        ? applications
        : applications.filter((a) => a.status === filter);
    return [...list].sort(
      (a, b) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
  }, [applications, filter]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      All: applications.length,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
      Ghosted: 0,
    };
    for (const a of applications) c[a.status] += 1;
    return c;
  }, [applications]);

  const isEmpty = applications.length === 0;

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
              I
            </div>
            <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
              InternTrack
            </h1>
          </div>
          <Button onClick={() => setAddOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            New Application
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {!isEmpty && (
          <>
            <div className="mb-5">
              <StatsHeader applications={applications} />
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      active
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {f}
                    <span
                      className={`text-[10px] ${
                        active ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      {counts[f]}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {isEmpty ? (
          <EmptyState onAdd={() => setAddOpen(true)} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-sm text-slate-500">
            No applications match this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))}
          </div>
        )}
      </main>

      <AddApplicationPage
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={onAdd}
      />

      <EditApplicationPage
        application={editing}
        onClose={() => setEditing(null)}
        onSubmit={onUpdate}
      />

      <ConfirmDialog
        open={deleting !== null}
        title="Delete application?"
        message={
          deleting
            ? `This will permanently remove "${deleting.company} — ${deleting.role}".`
            : ''
        }
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) onDelete(deleting.id);
          setDeleting(null);
        }}
      />
    </div>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-16 sm:py-24">
      <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 text-slate-400"
        >
          <path
            fillRule="evenodd"
            d="M2 4.25A2.25 2.25 0 014.25 2h11.5A2.25 2.25 0 0118 4.25v11.5A2.25 2.25 0 0115.75 18H4.25A2.25 2.25 0 012 15.75V4.25zm13.5 0a.75.75 0 00-.75-.75H5.25a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h9.5a.75.75 0 00.75-.75V4.25z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">
        No applications yet
      </h3>
      <p className="mt-1 text-sm text-slate-500 max-w-sm mx-auto">
        Track every internship you apply to. Start by adding your first one.
      </p>
      <div className="mt-6">
        <Button onClick={onAdd}>Add your first application</Button>
      </div>
    </div>
  );
}
