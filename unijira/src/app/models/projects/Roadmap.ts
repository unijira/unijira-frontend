import { ItemRoadmap } from "../item/ItemRoadmap";

export class Roadmap {
  public startingDate: Date;
  public endingDate: Date;
  public item: ItemRoadmap;
  public roadmapId: number;

  constructor(
     startingDate: Date,
     endingDate: Date,
     item: ItemRoadmap,
     roadmapId: number){
      this.startingDate= startingDate;
      this.endingDate= endingDate;
      this.item= item;
      this.roadmapId=roadmapId
  }

}
