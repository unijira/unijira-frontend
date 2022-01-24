import {UserInfo} from '../users/UserInfo';
import {ItemStatus} from './ItemStatus';
import {ItemType} from './ItemType';
import {Note} from './Note';
import {ItemAssignment} from './ItemAssignment';
import {MeasureUnit} from './MeasureUnit';
import {DateUtils} from '../../classes/date-utils';


export class Item {

  public id: number;
  public summary: string;
  public description: string;
  public measureUnit: MeasureUnit;
  public evaluation: number;
  public tags: string;
  public type: ItemType;
  public status: ItemStatus;
  public owner: UserInfo;

  // https://www.youtube.com/watch?v=JCQVnSOFqfM
  public fatherId: number;
  public sons: Item[];
  public notes: Note[];
  public assignees: ItemAssignment[];

  public releaseId: number;
  public releaseVersion: string;

  public createdAt: string;
  public updatedAt: string;


  public father: Item = undefined;




  constructor(
    id: number,
    summary: string,
    description: string,
    measureUnit: MeasureUnit,
    evaluation: number,
    tags: string,
    type: ItemType,
    status: ItemStatus,
    owner: UserInfo,
    fatherId: number,
    sons?: Item[],
    notes?: Note[],
    assignees?: ItemAssignment[]) {

      this.id = id;
      this.summary = summary;
      this.description = description;
      this.measureUnit = measureUnit;
      this.evaluation = evaluation;
      this.tags = tags;
      this.type = type;
      this.status = status;
      this.owner = owner;
      this.fatherId = fatherId;
      this.sons = sons || [];
      this.assignees = assignees || [];
      this.notes = notes || [];
      this.createdAt = DateUtils.toLocalDateTime();
      this.updatedAt = DateUtils.toLocalDateTime();
    }

}
