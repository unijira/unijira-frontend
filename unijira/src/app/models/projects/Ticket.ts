import {UserInfo} from '../users/UserInfo';
import {ItemStatus} from '../item/ItemStatus';
import {ItemType} from '../item/ItemType';


export class Ticket {

  public id: number;
  public summary: string;
  public description: string;
  public measureUnit: string;
  public evaluation: number;
  public tags: string;
  public type: ItemType;
  public status: ItemStatus;
  public owner: UserInfo;
  public father: Ticket;
  public createdAt: number;
  public updatedAt: number;


  constructor(id: number, summary: string, description: string, measureUnit: string, evaluation: number, tags: string, type: ItemType, status: ItemStatus, owner: UserInfo, father: Ticket) {
    this.id = id;
    this.summary = summary;
    this.description = description;
    this.measureUnit = measureUnit;
    this.evaluation = evaluation;
    this.tags = tags;
    this.type = type;
    this.status = status;
    this.owner = owner;
    this.father = father;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

}
