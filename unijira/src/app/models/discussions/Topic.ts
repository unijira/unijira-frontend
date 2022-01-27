import {DateUtils} from '../../classes/date-utils';

export class Topic {

  private id: number;
  private title: string;
  private content: string;
  private projectId: number;
  private authorId: number;
  private createdAt: string;
  private updatedAt: string;


  constructor(id: number, title: string, content: string, projectId: number, authorId: number) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.projectId = projectId;
    this.authorId = authorId;
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
  }
}
