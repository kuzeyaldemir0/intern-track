import type { Status } from './Status';

export interface Application {
  id: string;
  company: string;
  role: string;
  status: Status;
  deadline: string;
  applicationUrl?: string;
  notes?: string;
  createdAt: string;
}
