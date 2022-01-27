import {SprintInsertion} from './SprintInsertion';
import {SprintStatus} from './SprintStatus';
import {DateUtils} from '../classes/date-utils';

export class Sprint {

  public id: number;
  public startingDate: string;
  public endingDate: string;
  public insertions: SprintInsertion[];
  public backlogId: number;
  public status: SprintStatus;


  constructor(id: number, startingDate: Date, endingDate: Date, insertions: SprintInsertion[], backlogId: number, status: SprintStatus) {
    this.id = id;
    this.startingDate = DateUtils.toLocalDate(startingDate);
    this.endingDate = DateUtils.toLocalDate(endingDate);
    this.insertions = insertions;
    this.backlogId = backlogId;
    this.status = status;
  }
}
