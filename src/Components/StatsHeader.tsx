import type { Application } from '../Interfaces/Application';

interface StatsHeaderProps {
  applications: Application[];
}

export default function StatsHeader({ applications }: StatsHeaderProps) {
  const total = applications.length;
  const interviewing = applications.filter((a) => a.status === 'Interview').length;
  const offers = applications.filter((a) => a.status === 'Offer').length;

  const stat = (label: string, value: number, accent?: string) => (
    <div className="flex items-baseline gap-1.5">
      <span className={`text-lg font-semibold ${accent ?? 'text-slate-900'}`}>
        {value}
      </span>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      {stat('Total', total)}
      <span className="text-slate-300">·</span>
      {stat('Interviewing', interviewing, 'text-amber-600')}
      <span className="text-slate-300">·</span>
      {stat('Offers', offers, 'text-green-600')}
    </div>
  );
}
