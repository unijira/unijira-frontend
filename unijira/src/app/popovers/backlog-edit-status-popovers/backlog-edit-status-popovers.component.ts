import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backlog-edit-status-popovers',
  templateUrl: './backlog-edit-status-popovers.component.html',
  styleUrls: ['./backlog-edit-status-popovers.component.scss'],
})
export class BacklogEditStatusPopoversComponent implements OnInit {
  @Input() statusOriginale: number;
  @Output() editStatus: EventEmitter<number> = new EventEmitter<number>();
  statusModificato: number;

  constructor() { }

  ngOnInit() {}

  save() {
    console.log(this.statusModificato);
    this.editStatus.emit(this.statusModificato);
  }

  dismiss() {
    console.log('dismiss');
  }
}


