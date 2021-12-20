import { monthsName } from './../util';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Sprint } from '../models/Sprint';
import { DragulaService } from 'ng2-dragula';
import { TaskService } from '../store/task.service';
import * as TaskActions from '../store/task.action';
import { Store, props } from '@ngrx/store';
import * as _ from 'lodash';
import { BlDetailComponent } from '../modals/bl-detail/bl-detail.component';
import { ModalController, SpinnerTypes } from '@ionic/angular';
import { BacklogAPIService } from '../services/backlog-api.service';
import { PopoverController } from '@ionic/angular';
import { BacklogEditWeightPopoversComponent } from '../popovers/backlog-edit-weight-popovers/backlog-edit-weight-popovers.component';
import { BacklogEditStatusPopoversComponent } from '../popovers/backlog-edit-status-popovers/backlog-edit-status-popovers.component';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  sprint: Sprint = new Sprint([], new Date(), new Date());
  backlog: Sprint = new Sprint([], new Date(), new Date());

  startSpring: String;
  endSpring: String;
  monthNames = monthsName;

  constructor(
    private dragulaService: DragulaService,
    private taskService: TaskService,
    private store: Store,
    public modalController: ModalController,
    private backlogAPIService: BacklogAPIService,
    private popOverCtrl: PopoverController
  ) {
    let that = this;
    this.dragulaService.drop('bag').subscribe(({ name, el, source }) => {
      let tmpS = _.clone(that.sprint);
      let tmpB = _.clone(that.backlog);

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
        task: task,
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
  editStatus($event, task, type) {
    if (type === 'backlog') {
      let newTask = _.clone(task);
      console.log($event, task);
      newTask.status = $event.detail.value;
      let backlog = _.clone(this.backlog);
      backlog.tasks = this.backlog.tasks.map((t) => {
        if (t.id === task.id) {
          return newTask;
        } else {
          return t;
        }
      });
      console.log(backlog.tasks);
      this.store.dispatch(TaskActions.setBacklogAction({ backlog: backlog }));
    } else if (type === 'sprint') {
      let newTask = _.clone(task);
      console.log($event, task);
      newTask.status = $event.detail.value;
      let sprint = _.clone(this.sprint);
      sprint.tasks = this.sprint.tasks.map((t) => {
        if (t.id === task.id) {
          return newTask;
        } else {
          return t;
        }
      });
      console.log(sprint.tasks);
      this.store.dispatch(TaskActions.setSprintAction({ sprint: sprint }));
    }
  }

  editWeight(task, data, type) {
    // console.log('Edit Weight', $event, task, type);
    // if (
    //   $event.detail.value === '' ||
    //   $event.detail.value === null ||
    //   $event.detail.value === undefined ||
    //   _.isNaN($event.detail.value)
    // ) {
    //   return;
    // }
    // if (type === 'backlog') {
    //   if ($event.detail.data !== undefined) {
    //     let newTask = _.clone(task);
    //     console.log($event, task);
    //     newTask.weight = parseInt($event.detail.data);
    //     let backlog = _.clone(this.backlog);
    //     backlog.tasks = this.backlog.tasks.map((t) => {
    //       if (t.id === task.id) {
    //         return newTask;
    //       } else {
    //         return t;
    //       }
    //     });
    //     console.log(backlog.tasks);
    //     this.store.dispatch(TaskActions.setBacklogAction({ backlog: backlog }));
    //   }
    // } else if (type === 'sprint') {
      console.log(data.data.value, task);
      if (data.data.value !== undefined) {
        let newTask = _.clone(task);
        console.log(data.data.value, task);
        newTask.weight = parseInt(data.data.value);
        let sprint = _.clone(this.sprint);
        sprint.tasks = this.sprint.tasks.map((t) => {
          if (t.id === task.id) {
            return newTask;
          } else {
            return t;
          }
        });
        console.log(sprint.tasks);
        this.store.dispatch(TaskActions.setSprintAction({ sprint: sprint }));
      }
    // }
  }

  getFromApi() {
    let that = this;
    this.backlogAPIService.getBacklog().subscribe((response) => {
      that.backlog = _.clone(response);
    });

    this.backlogAPIService.getSprint().subscribe((response) => {
      this.sprint = _.clone(response);
    });
  }

  saveToAPI() {
    let tmpS = _.clone(this.sprint);
    let tmpB = _.clone(this.backlog);

    this.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
    this.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));

    this.backlogAPIService.setBacklog(this.backlog).subscribe((response) => {
      console.log(response);
    });

    this.backlogAPIService.setSprint(this.sprint).subscribe((response) => {
      console.log(response);
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

  async editStatusPopover(ev: any, status) {
    const popOver = await this.popOverCtrl.create({
      component: BacklogEditStatusPopoversComponent,
      cssClass: 'backlog-edit-status-popover',
      event: ev,
      translucent: true,
      componentProps: {
        statusOriginal: status,
      },
    });

    popOver.onDidDismiss().then((data) => {
      console.log(data);
    });

    return await popOver.present();
  }
}
