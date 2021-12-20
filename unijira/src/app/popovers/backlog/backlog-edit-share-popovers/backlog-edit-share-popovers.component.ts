import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Task } from 'src/app/models/Task';
@Component({
  selector: 'app-backlog-edit-share-popovers',
  templateUrl: './backlog-edit-share-popovers.component.html',
  styleUrls: ['./backlog-edit-share-popovers.component.scss'],
})
export class BacklogEditSharePopoversComponent implements OnInit {
  @Input() task: Task;
  constructor() { }

  ngOnInit() {}

}
