import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
  selector: 'app-backlog-edit-weight-popovers',
  templateUrl: './backlog-edit-weight-popovers.component.html',
  styleUrls: ['./backlog-edit-weight-popovers.component.scss'],
})
export class BacklogEditWeightPopoversComponent implements OnInit {
  @Input() pesoOriginal: number;
  @Output() editPeso: EventEmitter<number> = new EventEmitter<number>();
  pesomodificato: number;
  constructor(private popoverCtrl: PopoverController) {}

  ngOnInit() {
    this.pesomodificato = this.pesoOriginal;
  }

  save() {
    this.popoverCtrl.dismiss({value: this.pesomodificato}).then();
  }

  dismiss() {
    this.popoverCtrl.dismiss({value: undefined}).then();
  }
}
