import { User } from './User';

export class Task {
  name: string;
  status: string;
  assignedTo: User[];
  weight: number;
  children: Task[];
  type: string;
}
