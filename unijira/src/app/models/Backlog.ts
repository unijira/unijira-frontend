import { Sprint } from './Sprint';
import {BacklogInsertion} from './BacklogInsertion';
import { Project } from './projects/Project';

export class Backlog {

  constructor(
    public id: number,
    public project: Project,
    public sprint: Sprint,
    public insertions: BacklogInsertion[],
  ) {

  }
}
