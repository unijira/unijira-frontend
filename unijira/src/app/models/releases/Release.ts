import {ReleaseStatus} from './ReleaseStatus';

export class Release {

  public id: number;
  public version: string;
  public description: string;
  public status: ReleaseStatus = ReleaseStatus.draft;
  public startDate: string;
  public endDate: string;
  public projectId: number;
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(id: number, version: string, description: string, status: ReleaseStatus, startDate: Date, endDate: Date, projectId: number) {
    this.id = id;
    this.version = version;
    this.description = description;
    this.status = status;
    this.startDate = startDate.toISOString().substring(0, 10);
    this.endDate = endDate.toISOString().substring(0, 10);
    this.projectId = projectId;
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

  static empty(projectId: number): Release {
    return new Release(undefined, 'v1.0.0', '', ReleaseStatus.draft, new Date(Date.now()), new Date(Date.now() + 86400000), projectId);
  }

}
