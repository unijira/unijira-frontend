import {UserInfo} from '../users/UserInfo';
import {TopicType} from './TopicType';

export class Topic {

  public user: UserInfo;
  public numMessages: number;

  constructor(
    public id: number,
    public title: string,
    public content: string,
    public projectId: number,
    public userId: number,
    public type: TopicType,
  ) {
  }
}
