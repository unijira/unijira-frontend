import {ItemStatus} from './ItemStatus';


export class ItemStatusHistory {

  public id: number;
  public itemId: number;
  public oldStatus: ItemStatus;
  public newStatus: ItemStatus;
  public changeDate: Date;


  constructor(
    id: number,
    itemId: number,
    oldStatus: ItemStatus,
    newStatus: ItemStatus,
    changeDate: Date
  ) {

      this.id = id;
      this.itemId = itemId;
      this.oldStatus = oldStatus;
      this.newStatus = newStatus;
      this.changeDate = changeDate;
    }

}
