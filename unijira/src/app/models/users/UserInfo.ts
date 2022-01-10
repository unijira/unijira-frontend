import {UserStatus} from "./UserStatus";

export class UserInfo {

  constructor(
    public id: number,
    public username: string,
    public avatar: URL,
    public status: UserStatus,
    public disabled: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public birthDate: Date,
    public firstName: string,
    public lastName: string,
    public role: string,
    public description: string,
    public github: string,
    public linkedin: string,
    public phoneNumber: string
  ) {
  }

}
