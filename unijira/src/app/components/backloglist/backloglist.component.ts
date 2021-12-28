import { Component, Input, OnInit } from '@angular/core';
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
}
