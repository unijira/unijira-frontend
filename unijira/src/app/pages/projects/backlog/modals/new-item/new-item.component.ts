import { Backlog } from './../../../../../models/Backlog';
import { UserInfo } from './../../../../../models/users/UserInfo';
import { SessionService } from './../../../../../store/session.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { Item } from '../../../../../models/item/Item';

import { ItemAssignment } from 'src/app/models/item/ItemAssignment';
import { ItemStatus } from 'src/app/models/item/ItemStatus';
import { ItemType } from 'src/app/models/item/ItemType';
import { BacklogInsertion } from 'src/app/models/BacklogInsertion';
import { BacklogAPIService } from 'src/app/services/backlog-api.service';
import { Project } from 'src/app/models/projects/Project';
@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  item: Item;
  backlogInsertion: BacklogInsertion;

  project: Project;
  backlog: Backlog;
  user: UserInfo;

  description: string;
  summary: string;
  tags: string;
  measureunit: string;
  evaluation: number;
  status: ItemStatus;
  type: ItemType;

  constructor(
    private sessionService: SessionService,

    private backlogAPIService: BacklogAPIService,
    private modalController: ModalController
  ) {
    this.sessionService.getUserInfo().subscribe((user) => {
      this.user = user;
    });

    this.sessionService.getProject().subscribe((project) => {
      this.project = project;
      this.backlogAPIService
        .getFirstBacklog(this.project.id)
        .subscribe((backlog) => {
          this.backlog = backlog;
        });
    });
  }

  ngOnInit() {
    this.item = new Item(
      0,
      '',
      '',
      '',
      0,
      '',
      ItemType.task,
      ItemStatus.open,
      this.user,
      null
    );
    this.backlogInsertion = new BacklogInsertion(0, this.item, this.backlog, 1);
  }

  close() {
    this.modalController.dismiss({}).then();
  }

  save() {
    this.backlogAPIService.addItem(this.item).subscribe((item) => {
      this.item = item;
    });
  }
}
/*

  Description => string
  Tags => string
  Owner => default utente attuale
  Evaluation => number
  Summary => string
  Status => default open
  Summary => string
  MeasureUnit => string
  Type => select itemType

  backlogInsertion
  backlogId => defualt dal parametro
  priority => default 1

*/
