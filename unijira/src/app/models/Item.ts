import {User} from './User';
import {UserInfo} from './users/UserInfo';
import {Note} from './Note';
import {ItemAssignment} from './ItemAssignment';

export class Item {

  constructor(
    public id: number,
    public summary: string,
    public description: string,
    public measureUnit: string,
    public evaluation: number,
    public tags: string,
    public type: string,
    public status: TaskStatus,
    public owner: UserInfo,
    public father: Item,
    public notes: Note[],
    public assignees: ItemAssignment[]
  ) {

  }
}

export enum TaskStatus {
  OPEN,
  DONE
}
