export class Notify {
  public id: number;
  public title: string;
  public message: string;
  public priority: string;
  public read: boolean;
  public target: string;
  public userId: number;
  public createdAt: string;
  public updatedAt: string;


  constructor(id: number, title: string, message: string, priority: string, read: boolean, target: string, userId: number) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.priority = priority;
    this.read = read;
    this.target = target;
    this.userId = userId;
    this.createdAt = new Date().toUTCString();
    this.updatedAt = new Date().toUTCString();
  }
}

