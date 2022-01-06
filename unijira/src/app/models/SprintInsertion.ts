import {Item} from './item/Item';

export class SprintInsertion {

  constructor(
    public id: number,
    public sprintId: number,
    public item: Item
  ) {
  }
}
