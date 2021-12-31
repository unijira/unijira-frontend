import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-backlog-edit-status-popovers',
  templateUrl: './backlog-edit-status-popovers.component.html',
  styleUrls: ['./backlog-edit-status-popovers.component.scss'],
})
export class BacklogEditStatusPopoversComponent implements OnInit {
  @Input() statusOriginale: number;
  @Output() editStatus: EventEmitter<number> = new EventEmitter<number>();

  statusModificato: number;   // Are we sure about it?

  statusType = [
    { name: 'backlog.edit.status.progress', value: 'in_corso', className: 'primary' },
    { name: 'backlog.edit.status.done', value: 'completato', className: 'success' },
    { name: 'backlog.edit.status.toDo', value: 'da_completare', className: 'light' },
  ];

  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {}

  setStatus(status) {
    this.statusModificato = status.value;
  }
  selectOptions(event) {
    document.querySelectorAll('ion-badge').forEach((element) => {
      element.classList.remove('selected');
    });
    event.target.classList.add('selected');
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
