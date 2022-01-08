import {MembershipStatus} from './MembershipStatus';
import {MembershipRoles} from './MembershipRoles';
import {UserInfo} from '../users/UserInfo';
import {MembershipPermission} from './MembershipPermission';

export class Membership {

  public userInfo?: UserInfo = null;

  constructor(
    public keyUserId: number,
    public keyProjectId: number,
    public role: MembershipRoles,
    public status: MembershipStatus,
    public permissions: Set<MembershipPermission>,
  ) { }

}
