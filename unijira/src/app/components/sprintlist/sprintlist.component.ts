import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {BacklogAPIService} from 'src/app/services/backlog-api.service';

@Component({
  selector: 'app-sprintlist',
  templateUrl: './sprintlist.component.html',
  styleUrls: ['./sprintlist.component.scss'],
})
export class SprintlistComponent implements OnInit, OnChanges {
  @Input() projectId: number;
  @Input() backlogId: number;
  @Output() sprintSelected = new EventEmitter();

  sprintList: any;
  customPopoverOptions: any = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color'
  };

  constructor(private backlogService: BacklogAPIService) {
    this.sprintList = [];
  }

  ngOnInit() {}

  ngOnChanges() {
    this.backlogService
    .getSprintList(this.projectId, this.backlogId)
    .subscribe((res) => {
      this.sprintList = res;
    });
  }

  handleSelection(ev) {
    this.sprintSelected.emit(ev.target.value);
  }
}
