export class UserInfo {

  constructor(
    public id: number,
    public username: string,
    public avatar: URL,
    public activated: boolean,
    public disabled: boolean,
    public createdAt: string,
    public updatedAt: string,
  ) {
  }

  // NOTE: HttpService converte in automatico da json a UserInfo
  // NOTE: Se non serve per altro, si puà anche eliminare
  /** @deprecated **/
  static toUserInfo(json: any): UserInfo {

    return new UserInfo(
      json.id,
      json.username,
      json.avatar,
      json.actived,
      json.disabled,
      json.createdAt,
      json.updatedAt
    );
  }
}
