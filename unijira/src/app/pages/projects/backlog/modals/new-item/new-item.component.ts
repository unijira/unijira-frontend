import {Backlog} from '../../../../../models/Backlog';
import {UserInfo} from '../../../../../models/users/UserInfo';
import {SessionService} from '../../../../../store/session.service';
import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Item} from '../../../../../models/item/Item';
import {ItemStatus} from 'src/app/models/item/ItemStatus';
import {ItemType} from 'src/app/models/item/ItemType';
import {BacklogInsertion} from 'src/app/models/BacklogInsertion';
import {BacklogAPIService} from 'src/app/services/backlog-api.service';
import {Project} from 'src/app/models/projects/Project';
import {ActivatedRoute} from '@angular/router';
import {MeasureUnit} from '../../../../../models/item/MeasureUnit';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css'],
})
export class NewItemComponent implements OnInit {
  @Input() pid: number;
  @Input() bid: number;

  item: Item;
  backlogInsertion: BacklogInsertion;

  project: Project;
  backlog: Backlog;
  user: UserInfo;

  description: string;
  summary: string;
  tags: string;
  measureunit: MeasureUnit;
  evaluation: number;
  status: ItemStatus;
  type: ItemType;
  statusList: any[];

  constructor(
    private sessionService: SessionService,
    private backlogAPIService: BacklogAPIService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute
  ) {
    this.statusList = [];
    for (const type in ItemType) {
      if (ItemType.hasOwnProperty(type)) {
        this.statusList.push({
          name: `backlog.edit.type.${type}`,
          value: type,
          className: type,
        });
      }
    }
    this.sessionService.getUserInfo().subscribe((user) => {
      this.user = user;
    });

    this.backlogAPIService
      .getFirstBacklog(this.pid)
      .subscribe((backlog) => {
        this.backlog = backlog;
      });
  }

  ngOnInit() {
    this.item = new Item(
      0,
      '',
      '',
      MeasureUnit.storyPoints,
      0,
      '',
      ItemType.task,
      ItemStatus.open,
      this.user,
      null, // FIXME: Attribuire un projectId valido
      null
    );
    this.backlogInsertion = new BacklogInsertion(0, this.item, this.backlog, 1);
    console.log('INIT ', this.item);
  }

  close() {
    this.modalController.dismiss({}).then();
  }

  save() {
    this.item.description = this.description;
    this.item.summary = this.summary;
    this.item.tags = this.tags;
    this.item.measureUnit = this.measureunit;
    this.item.evaluation = this.evaluation;
    this.item.type = ItemType[this.type];
    this.item.assignees = [];

    delete this.item.createdAt;
    delete this.item.updatedAt;
    console.log('SAVE ', this.item);
    const that = this;
    this.backlogAPIService.addItem(this.item).subscribe((item) => {
      this.item = item;
      console.log('ITEM CREATO ', this.item);
      this.backlogInsertion.item = item;
      this.backlogAPIService
        .addBacklogInsertion(
          this.pid,
          this.bid,
          this.backlogInsertion
        )
        .subscribe((backlogInsertion) => {
          this.modalController.dismiss({}).then();
        });
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
