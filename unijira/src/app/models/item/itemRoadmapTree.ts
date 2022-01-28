import {UserInfo} from '../users/UserInfo';
import {ItemStatus} from './ItemStatus';
import {ItemType} from './ItemType';
import {Note} from './Note';
import {ItemAssignment} from './ItemAssignment';


export class ItemRoadmapTree {
  public roadmapInsertionId: number;
  public roadmapInsertionStartingDate:Date;
  public roadmapInsertionEndingDate: Date;
  public itemId: number;
  public itemSummary: string;
  public itemDescription: string;
  public itemMeasureUnit: string;
  public itemEvaluation: number;
  public itemTags: string;
  public itemType: ItemType;
  public itemStatus: ItemStatus;
  public itemOwner: UserInfo;
  public assignees: ItemAssignment[];
  public children: ItemRoadmapTree[];


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
    father: number,
    notes?: Note[],
    assignees?: ItemAssignment[],
    children?: ItemRoadmapTree[])
  {
    // per fare questi assegnamenti è meno verboso scrivere direttamente "public field: type" nel costruttore
    this.roadmapInsertionId = id;
    this.itemSummary = summary;
    this.itemDescription = description;
    this.itemMeasureUnit = measureUnit;
    this.itemEvaluation = evaluation;
    this.itemTags = tags;
    this.itemType = type;
    this.itemStatus = status;
    this.itemOwner = owner;
    this.assignees = assignees || [];
   this.children = children || [];
  }

}
