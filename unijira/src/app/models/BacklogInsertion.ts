import {Item} from './item/Item';

export class BacklogInsertion {

  constructor(
    public id: number,
    public item: Item,
    public backlog: number,
    public priority: number,
  ) {
  }
}
