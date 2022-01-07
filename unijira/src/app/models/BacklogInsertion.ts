import {Item} from './item/Item';

export class BacklogInsertion {

  constructor(
    public id: number,
    public backlogId: number,
    public item: Item
  ) {
  }
}
