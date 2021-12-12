import { User } from './User';

export class Task {
  id: number;
  name: string;
  status: string;
  assignedTo: User[];
  weight: number;
  children: Task[];
  type: string;
  comments: string[];
  tags: string[];
}
