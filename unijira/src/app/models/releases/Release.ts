import {ReleaseStatus} from './ReleaseStatus';

export class Release {

  public id: number;
  public version: string;
  public description: string;
  public status: ReleaseStatus = ReleaseStatus.draft;
  public startDate: Date;
  public endDate: Date;
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(id: number, version: string, description: string, status: ReleaseStatus, startDate: Date, endDate: Date) {
    this.id = id;
    this.version = version;
    this.description = description;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

}
