import {UserInfo} from '../users/UserInfo';
import {TopicType} from './TopicType';

export class Topic {

  public user: UserInfo;
  public numMessages = 0;
  public userUsername: string;
  public userAvatar: URL;

  constructor(
    public id: number,
    public title: string,
    public content: string,
    public projectId: number,
    public userId: number,
    public type: TopicType,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
  }
}
