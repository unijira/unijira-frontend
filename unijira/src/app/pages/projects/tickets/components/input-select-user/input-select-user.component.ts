import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInfo} from '../../../../../models/users/UserInfo';
import {ItemAssignment} from '../../../../../models/item/ItemAssignment';

@Component({
  selector: 'app-input-select-user',
  templateUrl: './input-select-user.component.html',
  styleUrls: ['./input-select-user.component.scss'],
})
export class InputSelectUserComponent implements OnInit {

  @Input() memberships: UserInfo[];
  @Input() ticketId: number;
  @Input() multiple = false;
  @Input() ngModel: ItemAssignment[];
  @Output() ngModelChange = new EventEmitter<ItemAssignment[]>();

  constructor() { }
  ngOnInit() { }


  selected(user: UserInfo): boolean {
    return this.ngModel.some(assignment => assignment.assignee.id === user.id);
  }

  toggle(user: UserInfo) {
    if (this.selected(user)) {
      this.ngModel = this.ngModel.filter(assignment => assignment.assignee.id !== user.id);
    } else {
      if(this.multiple) {
        this.ngModel.push(new ItemAssignment(this.ticketId, user));
      } else {
        this.ngModel = [new ItemAssignment(this.ticketId, user)];
      }
    }
    this.ngModelChange.emit(this.ngModel);
  }

}
