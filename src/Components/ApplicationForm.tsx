import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Application } from '../Interfaces/Application';
import type { Status } from '../Interfaces/Status';
import { STATUSES } from '../Interfaces/Status';
import Button from './Button';

export type ApplicationFormData = Omit<Application, 'id' | 'createdAt'>;

interface ApplicationFormProps {
  initial?: Partial<ApplicationFormData>;
  submitLabel?: string;
  onSubmit: (data: ApplicationFormData) => void;
  onCancel: () => void;
}

function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function ApplicationForm({
  initial,
  submitLabel = 'Save',
  onSubmit,
  onCancel,
}: ApplicationFormProps) {
  const [company, setCompany] = useState(initial?.company ?? '');
  const [role, setRole] = useState(initial?.role ?? '');
  const [status, setStatus] = useState<Status>(initial?.status ?? 'Applied');
  const [deadline, setDeadline] = useState(initial?.deadline ?? todayIso());
  const [applicationUrl, setApplicationUrl] = useState(
    initial?.applicationUrl ?? ''
  );
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) {
      setError('Company and Role are required.');
      return;
    }
    onSubmit({
      company: company.trim(),
      role: role.trim(),
      status,
      deadline,
      applicationUrl: applicationUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  const inputClass =
    'block w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-colors focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200';
  const labelClass = 'block text-xs font-medium text-slate-700 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>
          Company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputClass}
          placeholder="e.g. Nexora Labs"
          autoFocus
        />
      </div>

      <div>
        <label className={labelClass}>
          Role <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={inputClass}
          placeholder="e.g. Software Engineering Intern"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            className={inputClass}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Application URL</label>
        <input
          type="url"
          value={applicationUrl}
          onChange={(e) => setApplicationUrl(e.target.value)}
          className={inputClass}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={inputClass}
          placeholder="Anything to remember..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
