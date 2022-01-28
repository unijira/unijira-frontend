import {DateUtils} from '../../classes/date-utils';

export class EvaluationProposal {

  public id: number;
  public ticketId: number;
  public authorId: number;
  public authorUsername: string;
  public authorAvatar: URL;
  public evaluation: number;
  public content: string;
  public createdAt: string;
  public updatedAt: string;


  constructor(ticketId: number, authorId: number, evaluation: number, content: string) {
    this.id = null;
    this.ticketId = ticketId;
    this.authorId = authorId;
    this.authorUsername = null;
    this.authorAvatar = null;
    this.evaluation = evaluation ?? 0;
    this.content = content ?? '';
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
  }

}
