import { setBacklogAction } from './../../../store/task.action';
import { ItemStatus } from './../../../models/item/ItemStatus';
// import { monthsName } from './../util';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Sprint } from '../../../models/Sprint';
import { DragulaService } from 'ng2-dragula';
import { TaskService } from '../../../store/task.service';
import * as TaskActions from '../../../store/task.action';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { BlDetailComponent } from './modals/bl-detail/bl-detail.component';
import { ModalController, PopoverController } from '@ionic/angular';
import { BacklogAPIService } from '../../../services/backlog-api.service';
import { BacklogEditWeightPopoversComponent } from './popovers/backlog-edit-weight-popovers/backlog-edit-weight-popovers.component';
import { BacklogEditStatusPopoversComponent } from './popovers/backlog-edit-status-popovers/backlog-edit-status-popovers.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Backlog } from '../../../models/Backlog';
import { BacklogInsertion } from '../../../models/BacklogInsertion';
import { SprintInsertion } from '../../../models/SprintInsertion';
import { forEach } from 'lodash';
import { SprintStatus } from '../../../models/SprintStatus';
import { IonAccordionGroup } from '@ionic/angular';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  @ViewChild(IonAccordionGroup, { static: true })
  accordionGroup: IonAccordionGroup;
  sprint: Sprint = new Sprint(
    0,
    new Date(),
    new Date(),
    [],
    0,
    SprintStatus.inactive
  );
  backlog: Backlog = new Backlog(0, null, null, []);
  totalNonAvviatos: number;
  totalOpens: number;
  totalDones: number;
  totalNonAvviatob: number;
  totalOpenb: number;
  totalDoneb: number;
  sprintServer: Sprint = new Sprint(
    0,
    new Date(),
    new Date(),
    [],
    0,
    SprintStatus.inactive
  );
  backlogServer: Backlog = new Backlog(0, null, null, []);

  filterP$: number;

  startSprintDate: string;
  endSprintDate: string;

  minDate: string;

  // TODO Scablare
  projectId = 20;
  backlogId = 0;
  sprintId = 0;

  sprintIsStarted = false;

  sprintInfo: any;

  constructor(
    private dragulaService: DragulaService,
    private taskService: TaskService,
    private store: Store,
    public modalController: ModalController,
    private backlogAPIService: BacklogAPIService,
    private popOverCtrl: PopoverController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const that = this;
    this.totalDones = 0;
    this.totalNonAvviatos = 0;
    this.totalOpens = 0;
    this.totalDoneb = 0;
    this.totalNonAvviatob = 0;
    this.totalOpenb = 0;
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.filterP$ = parseInt(params.get('id'), 10);
    });

    this.projectId = this.filterP$;

    this.backlogAPIService.getFirstBacklog(this.projectId).subscribe((res) => {
      console.log('BACKLOG ID:', that.backlogId);
      that.backlogId = res.id;
      that.sprintId = res.sprints[0].id;
      this.getFromApi();
    });

    this.dragulaService.destroy('bag');

    this.dragulaService.drop('bag').subscribe(({ name, el, source }) => {
      const tmpS = _.cloneDeep(that.sprint);
      const tmpB = _.cloneDeep(that.backlog);
      that.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
      that.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));
    });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: false,
    });

    this.taskService.getBacklog().subscribe((b) => {
      console.log('----------------- GET BACKLOG -----------------');
      this.backlog = _.cloneDeep(b);
    });

    this.taskService.getSprint().subscribe((s) => {
      console.log('----------------- GET SPRINT -----------------');
      this.sprint = _.cloneDeep(s);
    });
  }
  logAccordionValue() {
    console.log(this.accordionGroup.value);
  }

  closeAccordion() {
    this.accordionGroup.value = undefined;
  }
  editSprint() {
    const datetoSend1 = new Date(this.startSprintDate)
      .toISOString()
      .split('T')[0];
    const dateToSend2 = new Date(this.endSprintDate)
      .toISOString()
      .split('T')[0];
    this.backlogAPIService
      .editSprint(
        this.projectId,
        this.backlogId,
        this.sprintId,
        datetoSend1,
        dateToSend2
      )
      .subscribe((response) => {});
  }
  onDateChangeStart(ev) {}

  onDateChangeEnd(ev) {}
  /* MODAL */
  async presentModal(task) {
    const modal = await this.modalController.create({
      component: BlDetailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        backlogInsertion: task,
      },
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  /* EDIT */
  editStatus(task, data, type) {
    if (type === 'backlog') {
      const newTask = _.cloneDeep(task);
      newTask.item.status = ItemStatus[data.data.value];
      const backlog = this.backlog;
      backlog.insertions = this.backlog.insertions.map((t) => {
        if (t.id === task.id) {
          return newTask;
        } else {
          return t;
        }
      });
      this.store.dispatch(TaskActions.setBacklogAction({ backlog }));
    } else if (type === 'sprint') {
      const newTask = _.cloneDeep(task);
      newTask.item.status = ItemStatus[data.data.value];
      const sprint = this.sprint;
      sprint.insertions = this.sprint.insertions.map((t) => {
        if (t.id === task.id) {
          return newTask;
        } else {
          return t;
        }
      });

      this.store.dispatch(TaskActions.setSprintAction({ sprint }));
    }
  }
  avviaSprint($event) {
    console.log('AVVIA SPRINT', $event.detail.value);
    this.sprint.startingDate = new Date().toISOString().split('T')[0];
    this.sprint.endingDate = new Date($event.detail.value)
      .toISOString()
      .split('T')[0];
    this.backlogAPIService
      .startSprint(this.projectId, this.backlogId, this.sprintId, this.sprint)
      .subscribe((response) => {
        this.getFromApi();
      });
  }

  stopSprint() {
    alert('stop');
  }

  editWeight(task, data, type) {
    if (
      data.data.value === '' ||
      data.data.value === null ||
      data.data.value === undefined ||
      _.isNaN(data.data.value)
    ) {
      return;
    }
    if (type === 'backlog') {
      if (data.data.value !== undefined) {
        const newTask = _.cloneDeep(task);
        newTask.item.evaluation = parseInt(data.data.value, 10);
        const backlog = this.backlog;
        backlog.insertions = this.backlog.insertions.map((t) => {
          if (t.id === task.id) {
            return newTask;
          } else {
            return t;
          }
        });

        this.store.dispatch(TaskActions.setBacklogAction({ backlog }));
      }
    } else if (type === 'sprint') {
      if (data.data.value !== undefined) {
        const newTask = _.cloneDeep(task);

        newTask.item.evaluation = parseInt(data.data.value, 10);

        const sprint = this.sprint;
        sprint.insertions = this.sprint.insertions.map((t) => {
          if (t.id === task.id) {
            return newTask;
          } else {
            return t;
          }
        });

        console.log('Aggiornamento evaluation ', newTask.item.evaluation);
        this.store.dispatch(TaskActions.setSprintAction({ sprint }));
      }
    }
  }

  getFromApi() {
    const that = this;

    this.backlogServer = _.cloneDeep(this.backlog);
    this.sprintServer = _.cloneDeep(this.sprint);

    this.backlogAPIService
      .getBacklog(this.projectId, this.backlogId)
      .subscribe((response) => {
        that.backlog = response;
        this.sprint = response.sprints.find((s) => s.id === that.sprintId);
        console.log(
          'start date ',
          this.sprint.startingDate,
          response.sprints[0].startingDate
        );
        if (this.sprint.startingDate != null) {
          this.startSprintDate = new Date(this.sprint.startingDate)
            .toISOString()
            .split('T')[0];
        }
        if (this.sprint.endingDate != null) {
          this.endSprintDate = new Date(this.sprint.endingDate)
            .toISOString()
            .split('T')[0];
        }
        this.sprintIsStarted = this.startSprintDate ? true : false;
      });

    this.backlogAPIService
      .getBacklogItems(this.projectId, this.backlogId)
      .subscribe((response) => {
        this.backlog.insertions = [];
        forEach(response, (item) => {
          this.backlog.insertions.push(JSON.parse(JSON.stringify(item)));
        });
        this.backlog.insertions.sort((a, b) => a.priority - b.priority);
        const tmpB = _.cloneDeep(that.backlog);
        this.backlogServer = _.cloneDeep(that.backlog);
        this.countElementsB();
        that.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
      });

    this.backlogAPIService
      .getSprintItems(this.projectId, this.backlogId, this.sprintId)
      .subscribe((response) => {
        this.sprint.insertions = [];
        forEach(response, (item) => {
          this.sprint.insertions.push(JSON.parse(JSON.stringify(item)));
        });
        const tmpS = _.cloneDeep(that.sprint);
        this.sprintServer = _.cloneDeep(that.sprint);
        this.countElementsS();
        that.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));
      });
  }
  changeBacklog(ev) {
    this.backlogId = ev;
    this.changeRoute();
  }
  changeRoute() {
    const url = `/home/projects/${this.projectId}/backlogs/${this.backlogId}/sprints/${this.sprintId}`;
    this.router.navigate([url]);
  }
  changeSprint(ev) {
    this.sprintId = ev;
    this.getFromApi();
  }

  saveToAPI() {
    const tmpS = _.cloneDeep(this.sprint);
    const tmpB = _.cloneDeep(this.backlog);

    // backlog insertions per modificare la priority e gli elementi che ci sono o non ci sono
    // sprint insertions per modificare la priority e gli elementi che ci sono o non ci sono
    // modifica diretta dell'item per modificare peso, stato e altre cose specifiche dell'item

    const itemToRemoveFromBacklog = [];
    const itemToRemoveFromSprint = [];

    const allInsertionsNew = _.compact(
      _.flatten(_.zip(tmpB.insertions, tmpS.insertions))
    );
    const allInsertionsOld = _.compact(
      _.flatten(
        _.zip(this.backlogServer.insertions, this.sprintServer.insertions)
      )
    );

    const allItemsNew = allInsertionsNew.map((item) => item.item);
    const allItemsOld = allInsertionsOld.map((item) => item.item);

    console.log('allItemsNew', allItemsNew);
    console.log('allItemsOld', allItemsOld);
    forEach(allItemsOld, (item) => {
      const itemNew = _.find(allItemsNew, (i) => i.id === item.id);
      if (!_.isEqual(item, itemNew)) {
        console.log('itemNew', itemNew);
        console.log('item diverso', item, itemNew);
        this.backlogAPIService.setItems(itemNew).subscribe((response) => {});
      } else {
        console.log('item uguale');
      }
    });

    this.backlogServer.insertions.forEach((item) => {
      if (tmpB.insertions.find((i) => i.id === item.id) === undefined) {
        itemToRemoveFromBacklog.push(
          new SprintInsertion(item.id, this.sprint, item.item, this.sprintId)
        );
      }
    });

    this.sprintServer.insertions.forEach((item) => {
      if (tmpS.insertions.find((i) => i.id === item.id) === undefined) {
        itemToRemoveFromSprint.push(
          new BacklogInsertion(item.id, item.item, this.backlog, 1)
        );
      }
    });

    itemToRemoveFromBacklog.forEach((item) => {
      this.backlogAPIService
        .deleteBacklogInsertion(this.projectId, this.backlogId, item)
        .subscribe((response) => {});
      this.backlogAPIService
        .addSprintInsertion(this.projectId, this.backlogId, this.sprintId, item)
        .subscribe((response) => {});
    });

    itemToRemoveFromSprint.forEach((item) => {
      this.backlogAPIService
        .deleteSprintInsertion(
          this.projectId,
          this.backlogId,
          this.sprintId,
          item
        )
        .subscribe((response) => {});
      this.backlogAPIService
        .addBacklogInsertion(this.projectId, this.backlogId, item)
        .subscribe((response) => {});
    });

    this.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
    this.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));
  }

  createSprint() {
    this.backlogAPIService
      .newSprint(this.projectId, this.backlogId)
      .subscribe((response) => {
        this.sprintId = response.id;
        this.getFromApi();
      });
  }

  async editPesoPopover(ev: any, item, type) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditWeightPopoversComponent,
      cssClass: 'backlog-edit-weight-popover',
      event: ev,
      translucent: true,
      componentProps: {
        pesoOriginal: item.item.evaluation,
      },
    });

    popOver.onDidDismiss().then((data) => {
      if (data.data !== undefined) {
        this.editWeight(item, data, type);
      }
    });

    return await popOver.present();
  }

  async editStatusPopover(ev: any, item, type) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditStatusPopoversComponent,
      cssClass: 'backlog-edit-status-popover',
      event: ev,
      translucent: true,
      componentProps: {
        statusOriginal: item.item.status,
      },
    });

    popOver.onDidDismiss().then((data) => {
      if (data.data.value !== undefined) {
        console.log('data', data);
        this.editStatus(item, data, type);
      }
    });

    return await popOver.present();
  }

  addItem() {
    alert('add item');
  }

  countElement(){
    this.countElementsB();
    this.countElementsS();
  }

  countElementsB() {
    this.totalDoneb = 0;
    this.totalOpenb = 0;
    this.totalNonAvviatob = 0;
    this.backlog.insertions.forEach((item) => {
      if (item.item.status === ItemStatus.done) {
        this.totalDoneb++;
      } else if (item.item.status === ItemStatus.open) {
        this.totalOpenb++;
      } else {
        this.totalNonAvviatob++;
      }
    });
    console.log('totalDoneb', this.totalDoneb);
    console.log('totalOpenb', this.totalOpenb);
    console.log('totalNonAvviatob', this.totalNonAvviatob);
  }

  countElementsS() {
    this.totalDones = 0;
    this.totalOpens = 0;
    this.totalNonAvviatos = 0;

    this.sprint.insertions.forEach((item) => {
      if (item.item.status === ItemStatus.done) {
        this.totalDones++;
      } else if (item.item.status === ItemStatus.open) {
        this.totalOpens++;
      } else {
        this.totalNonAvviatos++;
      }
    });
  }
}
