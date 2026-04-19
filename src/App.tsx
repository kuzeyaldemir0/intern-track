import { useEffect, useState } from 'react';
import type { Application } from './Interfaces/Application';
import type { ApplicationFormData } from './Components/ApplicationForm';
import Dashboard from './Pages/Dashboard';

const STORAGE_KEY = 'interntrack.applications.v1';

function daysFromNow(days: number): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function makeId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function buildSeedData(): Application[] {
  const now = new Date().toISOString();
  const seeds: Array<Omit<Application, 'id' | 'createdAt'>> = [
    {
      company: 'Nexora Labs',
      role: 'ML Engineer Intern',
      status: 'Applied',
      deadline: daysFromNow(12),
    },
    {
      company: 'Quantix Systems',
      role: 'Software Engineering Intern',
      status: 'Interview',
      deadline: daysFromNow(3),
    },
    {
      company: 'Orbital Data',
      role: 'Data Science Intern',
      status: 'Offer',
      deadline: daysFromNow(20),
    },
    {
      company: 'Vertex Dynamics',
      role: 'Backend Engineer Intern',
      status: 'Rejected',
      deadline: daysFromNow(-5),
    },
    {
      company: 'Coda Robotics',
      role: 'Computer Vision Intern',
      status: 'Applied',
      deadline: daysFromNow(8),
    },
    {
      company: 'Helix AI',
      role: 'NLP Research Intern',
      status: 'Interview',
      deadline: daysFromNow(5),
    },
    {
      company: 'Prism Analytics',
      role: 'Data Engineer Intern',
      status: 'Ghosted',
      deadline: daysFromNow(-14),
    },
    {
      company: 'Kairos Tech',
      role: 'Full Stack Intern',
      status: 'Applied',
      deadline: daysFromNow(15),
    },
    {
      company: 'Stratos Cloud',
      role: 'DevOps Intern',
      status: 'Applied',
      deadline: daysFromNow(10),
    },
    {
      company: 'Sable Robotics',
      role: 'Embedded Systems Intern',
      status: 'Rejected',
      deadline: daysFromNow(-2),
    },
  ];
  return seeds.map((s) => ({ ...s, id: makeId(), createdAt: now }));
}

function loadFromStorage(): Application[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed as Application[];
  } catch {
    return null;
  }
}

function saveToStorage(apps: Application[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch {
    // ignore quota/serialization errors
  }
}

export default function App() {
  const [applications, setApplications] = useState<Application[]>(() => {
    const stored = loadFromStorage();
    if (stored) return stored;
    return buildSeedData();
  });

  useEffect(() => {
    saveToStorage(applications);
  }, [applications]);

  const handleAdd = (data: ApplicationFormData) => {
    const newApp: Application = {
      ...data,
      id: makeId(),
      createdAt: new Date().toISOString(),
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleUpdate = (id: string, data: ApplicationFormData) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...data } : a))
    );
  };

  const handleDelete = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <Dashboard
      applications={applications}
      onAdd={handleAdd}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
}
