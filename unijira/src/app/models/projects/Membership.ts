import {MembershipStatus} from './MembershipStatus';
import {MembershipRoles} from './MembershipRoles';
import {UserInfo} from '../users/UserInfo';

export class Membership {

  public userInfo: UserInfo;

  constructor(
    public id: number,
    public userId: number,
    public projectId: number,
    public role: MembershipRoles,
    public status: MembershipStatus
  ) { }

}
