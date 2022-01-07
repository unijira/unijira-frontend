import { ItemStatus } from './../../../models/item/ItemStatus';
// import { monthsName } from './../util';
import { Component, OnInit } from '@angular/core';
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
import { Item } from '../../../models/item/Item';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  sprint: Sprint = new Sprint(0, new Date(), new Date(), [], 0);
  backlog: Backlog = new Backlog(0, null, null, []);

  filterP$: number;

  startSpring: string;
  endSpring: string;

  startSprintDate: Date;
  endSprintDate: Date;

  minDate: string;

  // TODO Scablare
  projectId = 12;
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
  ) {
    const that = this;

    this.backlogAPIService.getFirstBacklog(this.projectId).subscribe((res) => {
      that.backlogId = res.id;
      that.sprintId = res.sprints[0].id;
      this.getFromApi();
    });

    this.backlogAPIService
      .getSprintInfo(this.projectId, this.backlogId, this.sprintId)
      .subscribe((response) => {
        // that.sprintInfo = response;
        // that.startSprintDate = new Date(response.startingDate);
        // that.endSprintDate = new Date(response.enddingDate);
        // that.minDate = new Date(response.startDate).toISOString().split("T")[0];
        // that.startSpring = new Date(response.startDate).toISOString().split("T")[0];
        // that.endSpring = new Date(response.endDate).toISOString().split("T")[0];
        // that.sprintIsStarted = response.isStarted;
        this.sprintInfo = response;
      });

    this.minDate = new Date().toISOString().split('T')[0];
    this.startSpring = this.minDate;
    this.endSpring = this.minDate;

    // if (this.sprint.start) {
    //   this.sprintIsStarted = true;
    // }
    this.dragulaService.destroy('bag');

    this.dragulaService.drop('bag').subscribe(({ name, el, source }) => {
      const tmpS = _.clone(that.sprint);
      const tmpB = _.clone(that.backlog);

      that.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
      that.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));
    });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: false,
    });

    this.taskService.getBacklog().subscribe((b) => {
      this.backlog = _.clone(b);
    });

    this.taskService.getSprint().subscribe((s) => {
      this.sprint = _.clone(s);
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.filterP$ = parseInt(params.get('id'), 10);
      // this.filterB$ = parseInt(params.get('bid'));
      // this.filterS$ = parseInt(params.get('sid'));
    });

    this.projectId = this.filterP$;
    // this.backlogId = this.filterB$;
    // this.sprintId = this.filterS$;

    this.getFromApi();
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
      const backlog = _.cloneDeep(this.backlog);
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
      newTask.status = ItemStatus[data.data.value];
      const sprint = _.cloneDeep(this.sprint);
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
        const backlog = _.cloneDeep(this.backlog);
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
      console.log(data.data.value, task);
      if (data.data.value !== undefined) {
        const newTask = _.cloneDeep(task);
        console.log(data.data.value, task);
        newTask.item.evaluation = parseInt(data.data.value, 10);
        const sprint = _.cloneDeep(this.sprint);
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
  }

  getFromApi() {
    const that = this;
    this.backlogAPIService
      .getBacklogItems(this.projectId, this.backlogId)
      .subscribe((response) => {
        this.backlog.insertions = [];
        forEach(response, (item) => {
          this.backlog.insertions.push(JSON.parse(JSON.stringify(item)));
          console.log(this.backlog.insertions);
        });
      });

    this.backlogAPIService
      .getSprintItems(this.projectId, this.backlogId, this.sprintId)
      .subscribe((response) => {
        this.sprint.insertions = [];
        forEach(response, (item) => {
          this.sprint.insertions.push(JSON.parse(JSON.stringify(item)));
          console.log(this.sprint.insertions);
        });
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
    const tmpS = _.clone(this.sprint);
    const tmpB = _.clone(this.backlog);

    this.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
    this.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));

    this.backlogAPIService
      .setSprint(this.projectId, this.backlogId, this.sprintId, this.sprint)
      .subscribe((response) => {});

    this.backlog.insertions.forEach((element, index) => {
      this.backlogAPIService.setItems(element).subscribe((response) => {});
    });

    this.backlogAPIService
    .setBacklog(this.projectId, this.backlogId, this.backlog)
    .subscribe((response) => {});
  }

  createSprint() {
    // TODO
    alert('Create sprint');
  }

  async editPesoPopover(ev: any, item, type) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditWeightPopoversComponent,
      cssClass: 'backlog-edit-weight-popover',
      event: ev,
      translucent: true,
      componentProps: {
        pesoOriginal: item.evaluation,
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
        statusOriginal: item.status,
      },
    });

    popOver.onDidDismiss().then((data) => {
      if (data.data.value !== undefined) {
        this.editStatus(item, data, type);
      }
    });

    return await popOver.present();
  }
}
