import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BacklogAPIService } from '../../services/backlog-api.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-backloglist',
  templateUrl: './backloglist.component.html',
  styleUrls: ['./backloglist.component.scss'],
})
export class BackloglistComponent implements OnInit {
  @Input() projectId: number;
  @Output() backlogSelected = new EventEmitter();
  backlogList: any;


  constructor(private backlogService: BacklogAPIService) {
    this.backlogList = [];
  }

  ngOnInit() {
    this.backlogService.getBacklogList(this.projectId).subscribe((res) => {
      this.backlogList = res;
      console.log(res);
    });
  }

  handleSelection(ev) {
    alert(ev.target.value);
    this.backlogSelected.emit(ev.target.value);
  }

  customPopoverOptions: any = {
    // header: 'Hair Color',
    // subHeader: 'Select your hair color',
    // message: 'Only select your dominant hair color'
  };
}
