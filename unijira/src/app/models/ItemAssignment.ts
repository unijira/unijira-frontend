import {Item} from './Item';
import {UserInfo} from './users/UserInfo';

export class ItemAssignment {

  constructor(
    public id: number,
    public item: Item,
    public assignee: UserInfo
  ) {
  }
}
