import {Sprint} from './Sprint';
import {Item} from './item/Item';

export class SprintInsertion {

  constructor(
    public id: number,
    public sprint: Sprint,
    public item: Item,
    public sprintId: number
  ) {
  }
}
