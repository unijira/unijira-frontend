import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserInfo} from '../../../../../models/users/UserInfo';
import {ItemAssignment} from '../../../../../models/item/ItemAssignment';
import {Membership} from '../../../../../models/projects/Membership';
import {UserService} from '../../../../../services/user/user.service';

@Component({
  selector: 'app-input-select-user',
  templateUrl: './input-select-user.component.html',
  styleUrls: ['./input-select-user.component.scss'],
})
export class InputSelectUserComponent implements OnInit {

  @Input() memberships: Membership[];
  @Input() ticketId: number;
  @Input() multiple = false;
  @Input() ngModel: ItemAssignment[];
  @Output() ngModelChange = new EventEmitter<ItemAssignment[]>();

  users: UserInfo[] = [];


  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.memberships?.forEach(membership => {
      this.userService.getUser(membership.keyUserId).subscribe(user => {
        this.users.push(user);
      });
    });
  }


  selected(user: UserInfo): boolean {
    return this.ngModel.some(assignment => assignment.assigneeId === user.id);
  }

  toggle(user: UserInfo) {
    if (this.selected(user)) {
      this.ngModel = this.ngModel.filter(assignment => assignment.assigneeId !== user.id);
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
