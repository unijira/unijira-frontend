export class Ticket {

  public id: number;
  public title: string;
  public description: string;
  public type: string;
  public status: string;
  public priority: string;
  public projectId: number;
  public userId: number;
  public createdAt: number;
  public updatedAt: number;


  constructor(id: number, title: string, description: string, type: string, status: string, priority: string, projectId: number, userId: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.type = type;
    this.status = status;
    this.priority = priority;
    this.projectId = projectId;
    this.userId = userId;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

};
