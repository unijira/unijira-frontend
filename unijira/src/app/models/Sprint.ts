import {SprintInsertion} from './SprintInsertion';

export class Sprint {

  constructor(
    public id: number,
    public startingDate: Date,
    public endingDate: Date,
    public insertions: SprintInsertion[],
    public backlogId: number
  ) {

  }
}
