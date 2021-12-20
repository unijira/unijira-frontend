import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';
import { BrowserModule } from '@angular/platform-browser';
import { PopoverController } from '@ionic/angular';
import { BacklogEditWeightPopoversComponent } from '../../popovers/backlog-edit-weight-popovers/backlog-edit-weight-popovers.component';
import { BacklogEditStatusPopoversComponent } from '../../popovers/backlog-edit-status-popovers/backlog-edit-status-popovers.component';
@Component({
  selector: 'app-bl-detail',
  templateUrl: './bl-detail.component.html',
  styleUrls: ['./bl-detail.component.scss'],
})
export class BlDetailComponent implements OnInit {
  @Input()
  task: Task;
  @Output() outputData = new EventEmitter<Task>();
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private popOverCtrl: PopoverController) {}

  ngOnInit() {
    console.log(this.task);
  }
  emitData(data) {
    this.outputData.emit(data);
  }

  editAssegnatario() {
    alert('Edit assegnatario');
  }

  editDescrizione() {
    alert('Edit descrizione');
  }

  editNome() {
    alert('Edit nome');
  }

  allega() {
    alert('Allega');
  }

  addChildren() {
    alert('Add children');
  }

  addLink() {
    alert('Add link');
  }

  close() {
    alert('Close');
    this.closeModal.emit(true);
  }

  like() {
    alert('Like');
  }

  share() {
    alert('Share');
  }

  visibility() {
    alert('Visibility');
  }

  lock() {
    alert('Lock');
  }

  edit() {
    alert('Edit');
  }


  async editPesoPopover(ev: any, task, type) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditWeightPopoversComponent,
      cssClass: 'backlog-edit-weight-popover',
      event: ev,
      translucent: true,
      componentProps: {
        pesoOriginal: task.weight,
      },
    });

    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
        this.editWeight(task, data, type);
      }
    });

    return await popOver.present();
  }

  async editStatusPopover(ev: any, task, type) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditStatusPopoversComponent,
      cssClass: 'backlog-edit-status-popover',
      event: ev,
      translucent: true,
      componentProps: {
        statusOriginal: task.status,
      },
    });

    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
        this.editStatus(task, data, type);
      }
    });

    return await popOver.present();
  }
  editStatus(task, data, type) {
    console.log(data);
    console.log(task);
    console.log(type);
  }

  editWeight(task, data, type) {
    console.log(data);
    console.log(task);
    console.log(type);
  }

}
