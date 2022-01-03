export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
  avatar: URL;
  constructor(
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    token: string,
    avatar: URL
  ) {
    this.id = id ?? -1;
    this.username = username ?? '';
    this.password = password ?? '';
    this.firstName = firstName ?? '';
    this.lastName = lastName ?? '';
    this.token = token ?? '';
    this.avatar = avatar ?? null;
  }
}
