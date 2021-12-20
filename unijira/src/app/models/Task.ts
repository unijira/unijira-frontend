import {User} from './User';

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
  constructor(
    id: number,
    name: string,
    status: string,
    assignedTo: User[],
    weight: number,
    children: Task[],
    type: string,
    comments: string[],
    tags: string[]
  ) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.assignedTo = assignedTo ?? [];
    this.weight = weight;
    this.children = children ?? [];
    this.type = type;
    this.comments = comments ?? [];
    this.tags = tags ?? [];
  }
}
