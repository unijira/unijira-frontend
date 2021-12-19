import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backlog-edit-weight-popovers',
  templateUrl: './backlog-edit-weight-popovers.component.html',
  styleUrls: ['./backlog-edit-weight-popovers.component.scss'],
})
export class BacklogEditWeightPopoversComponent implements OnInit {
  @Input() pesoOriginal: number;
  @Output() editPeso: EventEmitter<number> = new EventEmitter<number>();
  pesomodificato: number;
  constructor() {}

  ngOnInit() {

  }

  save() {
    console.log(this.pesomodificato);
    this.editPeso.emit(this.pesomodificato);
  }

  dismiss() {
    console.log('dismiss');
  }
}
