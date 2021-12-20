import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-backlog-edit-status-popovers',
  templateUrl: './backlog-edit-status-popovers.component.html',
  styleUrls: ['./backlog-edit-status-popovers.component.scss'],
})
export class BacklogEditStatusPopoversComponent implements OnInit {
  @Input() statusOriginale: number;
  @Output() editStatus: EventEmitter<number> = new EventEmitter<number>();
  statusModificato: number;

  statusType = [
    { name: 'In Corso', value: "in_corso" },
    { name: 'Completato', value: "completato" },
    { name: 'Da Completare', value: "da_completare" },
  ];

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  setStatus(status) {
    this.statusModificato = status.value;
  }

  save() {
    console.log(this.statusModificato);
    this.popoverCtrl.dismiss({ value: this.statusModificato }).then();
  }

  dismiss() {
    console.log('dismiss');
    this.popoverCtrl.dismiss({ value: undefined }).then();
  }
}
