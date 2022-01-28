import {UserInfo} from '../users/UserInfo';

export class ItemAssignment {

  public id: number;
  public itemId: number;
  public assigneeId: number;
  public assigneeUsername: string;
  public assigneeAvatar: URL;

  constructor(itemId: number, assignee: UserInfo) {
    this.itemId = itemId;
    this.assigneeId = assignee.id;
    this.assigneeUsername = assignee.username;
    this.assigneeAvatar = assignee.avatar;
  }

}
