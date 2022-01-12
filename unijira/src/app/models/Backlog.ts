import {Sprint} from './Sprint';
import {BacklogInsertion} from './BacklogInsertion';
import {Project} from './projects/Project';

export class Backlog {

  constructor(
    public id: number,
    public project: Project,
    public sprints: Sprint[],
    public insertions: BacklogInsertion[],
  ) {

  }
}
