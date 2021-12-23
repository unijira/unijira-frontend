import {Task} from './Task';

export class Sprint {
    tasks: Task[];
    start: Date;
    end: Date;
  constructor(tasks: Task[], start: Date, end: Date) {
    this.tasks = tasks ?? [];
    this.start = start ?? new Date();
    this.end = end ?? new Date();
  }
}
