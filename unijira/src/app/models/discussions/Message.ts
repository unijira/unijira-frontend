import {DateUtils} from '../../classes/date-utils';

export class Message {

  public id: number;
  public text: string;
  public topicId: number;
  public authorId: number;
  public authorUsername: string;
  public repliesToId: number;
  public createdAt: string;
  public updatedAt: string;


  constructor(id: number, text: string, topicId: number, authorId: number, authorUsername: string, repliesToId: number, createdAt: number, updatedAt: number) {
    this.id = id;
    this.text = text;
    this.topicId = topicId;
    this.authorId = authorId;
    this.authorUsername = authorUsername;
    this.repliesToId = repliesToId;
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
  }
}
