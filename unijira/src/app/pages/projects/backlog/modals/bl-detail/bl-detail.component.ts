import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from '../../../../../models/Item';
import {ModalController, PopoverController} from '@ionic/angular';
import {
  BacklogEditWeightPopoversComponent
} from '../../popovers/backlog-edit-weight-popovers/backlog-edit-weight-popovers.component';
import {
  BacklogEditStatusPopoversComponent
} from '../../popovers/backlog-edit-status-popovers/backlog-edit-status-popovers.component';
import {
  BacklogEditSharePopoversComponent
} from '../../popovers/backlog-edit-share-popovers/backlog-edit-share-popovers.component';
import {
  BacklogEditLikePopoversComponent
} from '../../popovers/backlog-edit-like-popovers/backlog-edit-like-popovers.component';
import {
  BacklogEditVisibilityPopoversComponent
} from '../../popovers/backlog-edit-visibility-popovers/backlog-edit-visibility-popovers.component';
import {
  BacklogEditSubmenuPopoversComponent
} from 'src/app/pages/projects/backlog/popovers/backlog-edit-submenu-popovers/backlog-edit-submenu-popovers.component';
import {
  BacklogEditLinkPopoversComponent
} from '../../popovers/backlog-edit-link-popovers/backlog-edit-link-popovers.component';
import {
  BacklogEditLockPopoversComponent
} from 'src/app/popovers/backlog/backlog-edit-lock-popovers/backlog-edit-lock-popovers.component';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-bl-detail',
  templateUrl: './bl-detail.component.html',
  styleUrls: ['./bl-detail.component.scss'],
})
export class BlDetailComponent implements OnInit {
  @Input()
  task: Item;
  @Output() outputData = new EventEmitter<Item>();
  @Output() closeModal = new EventEmitter<boolean>();
  gitSuggestion = 'git checkout -b ';
  constructor(
    private popOverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private clipboard: Clipboard

  ) {}

  ngOnInit() {
    this.gitSuggestion += this.namePrepare(this.task.name);
  }
  emitData(data) {
    this.outputData.emit(data);
  }

  namePrepare(name) {
    return name.replace(/\s/g, '-').toLowerCase().trim().replace(/[^a-z0-9-]/g, '');
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
    this.modalCtrl.dismiss({}).then();
  }

  like() {
    alert('Like');
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

  copyToClipboard(ev) {
    this.clipboard.copy(this.gitSuggestion.toString());
  }

  async editLockPopover(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditLockPopoversComponent,
      cssClass: 'backlog-edit-lock-popover',
      event: ev,
      translucent: true,
      componentProps: {
        task: this.task,
      },
    });
    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
      }
    });

    return await popOver.present();
  }

  async editLinkPopover(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditLinkPopoversComponent,
      cssClass: 'backlog-edit-link-popover',
      event: ev,
      translucent: true,
      componentProps: {
        task: this.task,
      },
    });
    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
      }
    });

    return await popOver.present();
  }

  async actionsPopover(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditSubmenuPopoversComponent,
      cssClass: 'backlog-edit-submenu-popover',
      event: ev,
      translucent: true,
      componentProps: {
        task: this.task,
      },
    });
    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
      }
    });

    return await popOver.present();
  }

  async editVisibilityPopover(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditVisibilityPopoversComponent,
      cssClass: 'backlog-edit-visibility-popover',
      event: ev,
      componentProps: {
        task: this.task,
      },
    });

    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
      }
    });

    return await popOver.present();
  }

  async editLikePopover(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditLikePopoversComponent,
      cssClass: 'backlog-edit-like-popover',
      event: ev,
      componentProps: {
        task: this.task,
      },
    });

    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
      }
    });

    return await popOver.present();
  }

  async editSharePopover(ev: any) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditSharePopoversComponent,
      cssClass: 'backlog-edit-share-popover',
      event: ev,
      componentProps: {
        task: this.task,
      },
    });

    popOver.onDidDismiss().then((data) => {
      console.log(data);
      if (data.data !== undefined) {
      }
    });

    return await popOver.present();
  }

  async editPesoPopover(ev: any, task) {
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
        this.editWeight(data);
      }
    });

    return await popOver.present();
  }

  async editStatusPopover(ev: any, task) {
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
      if (data.data.value !== undefined) {
        this.editStatus(data);
      }
    });

    return await popOver.present();
  }
  editStatus(data) {
    this.task.status = data.data.value;
  }

  editWeight(data) {
    // this.task.weight = data.data.value;
  }
}
