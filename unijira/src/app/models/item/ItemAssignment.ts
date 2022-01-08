import {UserInfo} from '../users/UserInfo';

export class ItemAssignment {

  constructor(
    public id: number,
    public itemId: number,
    public assignee: UserInfo
  ) {
  }
}
