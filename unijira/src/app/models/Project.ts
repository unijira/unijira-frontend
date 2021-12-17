import { User } from '../../../../../../OneDrive/Desktop/unijira-frontend/models/User';
import { Membership } from './Membership';

export class Project {

  constructor(
    public id?: number,
    public name?: string,
    public key?: string,
    public icon?: string,
    public ownerId?: number,
    public memberships?: Membership[]) {
  }

  static toProject(json: any): Project {
    return new Project(json.id, json.name, json.key, json.icon, json.ownerId);
  }

}
