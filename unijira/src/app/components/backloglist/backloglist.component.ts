import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BacklogAPIService} from '../../services/backlog-api.service';

@Component({
  selector: 'app-backloglist',
  templateUrl: './backloglist.component.html',
  styleUrls: ['./backloglist.component.scss'],
})
export class BackloglistComponent implements OnInit {
  @Input() projectId: number;
  @Output() backlogSelected = new EventEmitter();
  backlogList: any;


  customPopoverOptions: any = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color'
  };
  constructor(private backlogService: BacklogAPIService) {
    this.backlogList = [];
  }

  ngOnInit() {
    this.backlogService.getBacklogList(this.projectId).subscribe((res) => {
      this.backlogList = res;
    });
  }

  handleSelection(ev) {
    alert(ev.target.value);
    this.backlogSelected.emit(ev.target.value);
  }

}
