import {Item} from './Item';
import {UserInfo} from './users/UserInfo';

export class Note {

  constructor(
    public id: number,
    public timestamp: Date,
    public message: string,
    public replyTo: Note,
    public refertsTo: Item,
    public author: UserInfo
  ) {
  }

}
