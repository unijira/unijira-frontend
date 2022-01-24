import {UserStatus} from './UserStatus';
import {DateUtils} from '../../classes/date-utils';

export class UserInfo {

  public id: number;
  public username: string;
  public avatar: URL;
  public status: UserStatus;
  public disabled: boolean;
  public birthDate: string;
  public firstName: string;
  public lastName: string;
  public role: string;
  public description: string;
  public github: string;
  public linkedin: string;
  public phoneNumber: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(id: number, username: string, avatar: URL, status: UserStatus, disabled: boolean, birthDate: Date, firstName: string, lastName: string, role: string, description: string, github: string, linkedin: string, phoneNumber: string) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.status = status;
    this.disabled = disabled;
    this.birthDate = DateUtils.toLocalDate(birthDate);
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.description = description;
    this.github = github;
    this.linkedin = linkedin;
    this.phoneNumber = phoneNumber;
    this.createdAt = DateUtils.toLocalDateTime();
    this.updatedAt = DateUtils.toLocalDateTime();
  }
}
