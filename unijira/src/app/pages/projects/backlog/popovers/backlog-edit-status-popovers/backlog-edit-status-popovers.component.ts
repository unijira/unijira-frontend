import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {ItemStatus} from 'src/app/models/item/ItemStatus';

@Component({
  selector: 'app-backlog-edit-status-popovers',
  templateUrl: './backlog-edit-status-popovers.component.html',
  styleUrls: ['./backlog-edit-status-popovers.component.scss'],
})
export class BacklogEditStatusPopoversComponent implements OnInit {
  @Input() statusOriginale: number;
  @Output() editStatus: EventEmitter<number> = new EventEmitter<number>();

  statusModificato: number; // Are we sure about it?

  statusType = [];

  constructor(private popoverCtrl: PopoverController) {
    for (const status in ItemStatus) {
      if (ItemStatus.hasOwnProperty(status)) {
        this.statusType.push({
          name: `backlog.edit.status.${status}`,
          value: status,
          className: status,
        });
      }
    }
  }

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
    this.popoverCtrl.dismiss({ value: this.statusModificato }).then();
  }

  dismiss() {
    this.popoverCtrl.dismiss({ value: undefined }).then();
  }
}
