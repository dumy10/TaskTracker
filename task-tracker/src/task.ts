import { Status } from './status';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: Status;
}
