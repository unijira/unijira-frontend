import {DateUtils} from '../../classes/date-utils';

export class Message {

  public id: number;
  public content: string;
  public topicId: number;
  public authorId: number;
  public authorUsername: string;
  public repliesToId: number;
  public createdAt: string;
  public updatedAt: string;


  constructor(id: number, content: string, topicId: number, authorId: number, authorUsername: string, repliesToId: number, createdAt: number, updatedAt: number) {
    this.id = id;
    this.content = content;
    this.topicId = topicId;
    this.authorId = authorId;
    this.authorUsername = authorUsername;
    this.repliesToId = repliesToId;
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
  }
}
