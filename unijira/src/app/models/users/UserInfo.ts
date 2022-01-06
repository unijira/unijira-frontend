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

}
