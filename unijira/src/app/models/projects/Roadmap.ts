import { Item } from '../item/Item';

export class Roadmap {
  public startingDate: Date;
  public endingDate: Date;
  public item: Item;
  public roadmapId: number;

  constructor(
     startingDate: Date,
     endingDate: Date,
     item: Item,
     roadmapId: number){
      this.startingDate= startingDate;
      this.endingDate= endingDate;
      this.item= item;
      this.roadmapId=roadmapId;
  }

}
