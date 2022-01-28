export class Document {

  constructor(
    public id: number,
    public filename: string,
    public mime: string,
    public path: URL,
    public projectId: number,
    public userId: number,
    public userFirstName: string,
    public userLastName: string,
    public userAvatar: URL,
    public userUsername: string,
    public createdAt: string,
    public updatedAt: string,
  ) { }

}
