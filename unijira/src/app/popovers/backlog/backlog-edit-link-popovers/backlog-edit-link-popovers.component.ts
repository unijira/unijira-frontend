import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Task } from '../../../models/Task';

@Component({
  selector: 'app-backlog-edit-link-popovers',
  templateUrl: './backlog-edit-link-popovers.component.html',
  styleUrls: ['./backlog-edit-link-popovers.component.scss'],
})
export class BacklogEditLinkPopoversComponent implements OnInit {
  @Input() task: Task;
  constructor() {}

  ngOnInit() {}
}
