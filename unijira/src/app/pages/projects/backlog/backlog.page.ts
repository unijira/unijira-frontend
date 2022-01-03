import {Component, OnInit} from '@angular/core';
import {Sprint} from '../../../models/Sprint';
import {DragulaService} from 'ng2-dragula';
import {TaskService} from '../../../store/task.service';
import * as TaskActions from '../../../store/task.action';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import {BlDetailComponent} from './modals/bl-detail/bl-detail.component';
import {ModalController, PopoverController} from '@ionic/angular';
import {BacklogAPIService} from '../../../services/backlog-api.service';
import {
  BacklogEditWeightPopoversComponent
} from './popovers/backlog-edit-weight-popovers/backlog-edit-weight-popovers.component';
import {
  BacklogEditStatusPopoversComponent
} from './popovers/backlog-edit-status-popovers/backlog-edit-status-popovers.component';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  sprint: Sprint = new Sprint([], new Date(), new Date());
  backlog: Sprint = new Sprint([], new Date(), new Date());

  startSpring: string;
  endSpring: string;

  // TODO Scablare
  projectId = 2;
  backlogId = 1;
  sprintId = 1;

  constructor(
    private dragulaService: DragulaService,
    private taskService: TaskService,
    private store: Store,
    public modalController: ModalController,
    private backlogAPIService: BacklogAPIService,
    private popOverCtrl: PopoverController
  ) {
    const that = this;
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
    this.getFromApi();
  }

  /* MODAL */
  async presentModal(task) {
    const modal = await this.modalController.create({
      component: BlDetailComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        task,
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
      const newTask = _.clone(task);
      newTask.status = data.data.value;
      const backlog = _.clone(this.backlog);
      backlog.tasks = this.backlog.tasks.map((t) => {
        if (t.id === task.id) {
          return newTask;
        } else {
          return t;
        }
      });
      this.store.dispatch(TaskActions.setBacklogAction({ backlog }));
    } else if (type === 'sprint') {
      const newTask = _.clone(task);
      newTask.status = data.data.value;
      const sprint = _.clone(this.sprint);
      sprint.tasks = this.sprint.tasks.map((t) => {
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
        const newTask = _.clone(task);
        newTask.weight = parseInt(data.data.value, 10);
        const backlog = _.clone(this.backlog);
        backlog.tasks = this.backlog.tasks.map((t) => {
          if (t.id === task.id) {
            return newTask;
          } else {
            return t;
          }
        });
        console.log(backlog.tasks);
        this.store.dispatch(TaskActions.setBacklogAction({ backlog }));
      }
    } else if (type === 'sprint') {
      console.log(data.data.value, task);
      if (data.data.value !== undefined) {
        const newTask = _.clone(task);
        console.log(data.data.value, task);
        newTask.weight = parseInt(data.data.value, 10);
        const sprint = _.clone(this.sprint);
        sprint.tasks = this.sprint.tasks.map((t) => {
          if (t.id === task.id) {
            return newTask;
          } else {
            return t;
          }
        });
        console.log(sprint.tasks);
        this.store.dispatch(TaskActions.setSprintAction({ sprint }));
      }
    }
  }

  getFromApi() {
    const that = this;
    this.backlogAPIService
      .getBacklog(this.projectId, this.backlogId)
      .subscribe((response) => {
        console.log(response);
        that.backlog = _.clone(response);
      });

    this.backlogAPIService
      .getSprint(this.projectId, this.backlogId, this.sprintId)
      .subscribe((response) => {
        this.sprint = _.clone(response);
        console.log(response);
      });
  }

  saveToAPI() {
    const tmpS = _.clone(this.sprint);
    const tmpB = _.clone(this.backlog);

    this.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
    this.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));

    // this.backlogAPIService
    //   .setBacklog(this.projectId, this.backlogId, this.backlog)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });

    // this.backlogAPIService
    //   .setSprint(this.projectId, this.backlogId, this.sprintId, this.sprint)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });

    this.backlog.tasks.forEach((element, index) => {
      console.log(element);
      this.backlogAPIService.setItems(element).subscribe((response) => {
        console.log(response);
      });
    });
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
      if (data.data.value !== undefined) {
        this.editStatus(task, data, type);
      }
    });

    return await popOver.present();
  }
}
