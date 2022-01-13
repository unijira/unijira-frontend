import {UserInfo} from '../users/UserInfo';

export class ItemAssignment {

  public id: number;
  public itemId: number;
  public assignee: UserInfo;

  constructor(itemId: number, assignee: UserInfo, id?: number) {
    this.id = id;
    this.itemId = itemId;
    this.assignee = assignee;
  }

}
