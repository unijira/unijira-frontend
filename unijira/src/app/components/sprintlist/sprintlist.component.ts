import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sprint } from '../../models/Sprint';
import { Task } from '../../models/Task';
import { User } from '../../models/User';
import { BacklogAPIService } from 'src/app/services/backlog-api.service';
@Component({
  selector: 'app-sprintlist',
  templateUrl: './sprintlist.component.html',
  styleUrls: ['./sprintlist.component.scss'],
})
export class SprintlistComponent implements OnInit {

  @Input() projectId: number;
  @Input() backlogId: number;

  @Output() sprintSelected = new EventEmitter();
  sprintList: any;

  constructor(private backlogService: BacklogAPIService) {
    this.sprintList = [];
  }


  ngOnInit() {
    this.backlogService.getSprintList(this.projectId, this.backlogId).subscribe((res) => {
      this.sprintList = res;
      console.log(res)
    });
  }


  handleSelection(ev) {
    this.sprintSelected.emit(ev.target.value);
  }


  customPopoverOptions: any = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color'
  };


}
