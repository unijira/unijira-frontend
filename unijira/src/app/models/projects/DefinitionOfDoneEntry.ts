export class DefinitionOfDoneEntry {

  public id: number;
  public description: string;
  public priority: number;
  public projectId: number;
  public createdAt: Date;
  public updatedAt: Date;

  public constructor(id: number, description: string, priority: number, projectId: number) {
    this.id = id;
    this.description = description;
    this.priority = priority;
    this.projectId = projectId;
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
  }

}
