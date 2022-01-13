import {DateUtils} from '../../classes/date-utils';
import {Backlog} from '../Backlog';

export class Project {

  public id: number;
  public name: string;
  public key: string;
  public icon: URL;
  public ownerId: number;
  public backlogs: Backlog[];
  public createdAt: string;
  public updatedAt: string;


  public iconLoaded: boolean;

  public constructor(id: number, name: string, key: string, icon: URL, ownerId: number) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.icon = icon;
    this.ownerId = ownerId;
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
    this.iconLoaded = false;
    this.backlogs = null;
  }

}
