import {SprintInsertion} from './SprintInsertion';
import { SprintStatus } from './SprintStatus';
export class Sprint {

  constructor(
    public id: number,
    public startingDate: any,
    public endingDate: any,
    public insertions: SprintInsertion[],
    public backlogId: number,
    public status: SprintStatus
  ) {

  }
}
