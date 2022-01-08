import { Backlog } from './Backlog';
import {Item} from './item/Item';

export class BacklogInsertion {

  constructor(
    public id: number,
    public item: Item,
    public backlog: Backlog,
    public priority: number,
  ) {
  }
}
