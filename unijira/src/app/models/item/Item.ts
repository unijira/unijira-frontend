import {UserInfo} from '../users/UserInfo';
import {ItemStatus} from './ItemStatus';
import {ItemType} from './ItemType';
import {Note} from './Note';
import {ItemAssignment} from './ItemAssignment';


export class Item {

  public id: number;
  public summary: string;
  public description: string;
  public measureUnit: string;
  public evaluation: number;
  public tags: string;
  public type: ItemType;
  public status: ItemStatus;
  public owner: UserInfo;
  public father: Item;
  public notes: Note[];
  public assignees: ItemAssignment[];
  public createdAt: number;
  public updatedAt: number;


  constructor(
    id: number,
    summary: string,
    description: string,
    measureUnit: string,
    evaluation: number,
    tags: string,
    type: ItemType,
    status: ItemStatus,
    owner: UserInfo,
    father: Item,
    notes?: Note[],
    assignees?: ItemAssignment[])
  {
    // per fare questi assegnamenti è meno verboso scrivere direttamente "public field: type" nel costruttore
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
    this.assignees = assignees || [];
    this.notes = notes || [];
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

}
