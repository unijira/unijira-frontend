import {MembershipStatus} from './MembershipStatus';
import {MembershipRoles} from './MembershipRoles';

export class Membership {
  public id: number;
  public userId: number;
  public projectId: number;
  public role: MembershipRoles;
  public status: MembershipStatus;
}
