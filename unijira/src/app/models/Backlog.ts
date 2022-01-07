import {BacklogInsertion} from './BacklogInsertion';

export class Backlog {

  constructor(
    public id: number,
    public startingDate: Date,
    public endingDate: Date,
    public insertions: BacklogInsertion[],
    public projectId: number
  ) {

  }
}
