export class UserInfo {

  constructor(
    public id: number,
    public username: string,
    public actived: boolean,
    public disabled: boolean,
    public createdAt: string,
    public updatedAt: string,
  ) {
  }

  static toUserInfo(json: any): UserInfo {

    return new UserInfo(
      json.id,
      json.username,
      json.actived,
      json.disabled,
      json.createdAt,
      json.updatedAt
    )
  }
}
