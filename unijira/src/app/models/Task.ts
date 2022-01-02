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
  description: string;
  note: string;
  epic: string;
  story: string;
  sprint: string;
  owner: User;
  constructor(
    id: number,
    name: string,
    status: string,
    assignedTo: User[],
    weight: number,
    children: Task[],
    type: string,
    comments: string[],
    tags: string[],
    description: string,
    note: string,
    epic: string,
    story: string,
    sprint: string,
    owner: User
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
    this.description = description ?? '';
    this.note = note ?? '';
    this.epic = epic ?? '';
    this.story = story ?? '';
    this.sprint = sprint ?? '';
    this.owner = owner ?? new User(0, '', '', '', '', '', null);
  }
}
