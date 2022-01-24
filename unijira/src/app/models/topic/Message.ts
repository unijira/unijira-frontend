import {UserInfo} from '../users/UserInfo';

export class Message {

  public user: UserInfo;
  public repliesTo: Message;

  constructor(
    public id: number,
    public text: string,
    public topicId: number,
    public authorId: number,
    public authorUsername: string,
    public repliesToId: number
  ) {
  }
}
