export class Project {

  public id: number;
  public name: string;
  public key: string;
  public icon: URL;
  public ownerId: number;
  public createdAt: number;
  public updatedAt: number;

  public constructor(id: number, name: string, key: string, icon: URL, ownerId: number) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.icon = icon;
    this.ownerId = ownerId;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

}
