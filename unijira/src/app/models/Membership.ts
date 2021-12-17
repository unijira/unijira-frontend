import { User } from '../../../../../../OneDrive/Desktop/unijira-frontend/models/User';
import { Project } from './Project';

export class Membership {

  constructor(
    public id: string,
    public role: string,
    public status: string,
    public project: Project,
    public user: User) {
  }

}
