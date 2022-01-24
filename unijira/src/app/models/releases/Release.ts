import {ReleaseStatus} from './ReleaseStatus';
import {DateUtils} from '../../classes/date-utils';

export class Release {

  public id: number;
  public version: string;
  public description: string;
  public status: ReleaseStatus = ReleaseStatus.draft;
  public startDate: string;
  public endDate: string;
  public projectId: number;
  public createdAt: string;
  public updatedAt: string;

  public constructor(id: number, version: string, description: string, status: ReleaseStatus, startDate: Date, endDate: Date, projectId: number) {
    this.id = id;
    this.version = version;
    this.description = description;
    this.status = status;
    this.startDate = DateUtils.toLocalDate(startDate);
    this.endDate = DateUtils.toLocalDate(endDate);
    this.projectId = projectId;
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
  }

  static empty(projectId: number): Release {
    return new Release(undefined, 'v1.0.0', '', ReleaseStatus.draft, new Date(Date.now()), new Date(Date.now() + 86400000), projectId);
  }

}
