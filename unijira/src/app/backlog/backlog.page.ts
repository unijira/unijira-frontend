import { monthsName } from './../util';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Sprint } from '../models/Sprint';
import { DragulaService } from 'ng2-dragula';
import { TaskService } from '../store/task.service';
import * as TaskActions from '../store/task.action';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { BlDetailComponent } from '../bl-detail/bl-detail.component';
import { ModalController, SpinnerTypes } from '@ionic/angular';

import { BacklogAPIService } from '../services/backlog-api.service';

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
    private backlogAPIService: BacklogAPIService
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
  editWeight($event, task, type) {
    if (
      $event.detail.value === '' ||
      $event.detail.value === null ||
      $event.detail.value === undefined ||
      _.isNaN($event.detail.value)
    ) {
      return;
    }
    if (type === 'backlog') {
      if ($event.detail.data !== undefined) {
        let newTask = _.clone(task);
        console.log($event, task);
        newTask.weight = parseInt($event.detail.data);
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
      }
    } else if (type === 'sprint') {
      if ($event.detail.data !== undefined) {
        let newTask = _.clone(task);
        console.log($event, task);
        newTask.weight = parseInt($event.detail.data);
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
  }
  ngOnInit() {}
  addTask() {
    let task = new Task(0, "Task random", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]);
    let backlog = _.clone(this.backlog);
    backlog.tasks.push(task);
    this.store.dispatch(TaskActions.setBacklogAction({ backlog: backlog }));
  }

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
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
    });
  }

  populate() {
    let sprint = new Sprint([], new Date(), new Date());
    let backlog = new Sprint([], new Date(), new Date());
    sprint.start = new Date('2021-11-18');
    sprint.end = new Date('2021-12-18');


    backlog.tasks.push(new Task(1, "Task 1", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]));
    backlog.tasks.push(new Task(2, "Task 2", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]));
    backlog.tasks.push(new Task(3, "Task 3", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]));

    backlog.tasks[0].children.push(new Task(4, "Task 4", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]));
    backlog.tasks[0].children.push(new Task(5, "Task 5", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]));
    backlog.tasks[0].children.push(new Task(6, "Task 6", "da completate", [], 1, [], "ssss", ["sss", "sss"], ["ssaasasas"]));

    backlog.tasks[0].assignedTo = [];
    backlog.tasks[0].assignedTo.push(new User(1, "USERNAME", "FIRSTNAME", "LASTNAME", "EMAIL", "PASSWORD", "ROLE"));
    backlog.tasks[1].assignedTo = [];
    backlog.tasks[1].assignedTo.push(new User(2, "USERNAME", "FIRSTNAME", "LASTNAME", "EMAIL", "PASSWORD", "ROLE"));
    backlog.tasks[2].assignedTo = [];
    backlog.tasks[2].assignedTo.push(new User(3, "USERNAME", "FIRSTNAME", "LASTNAME", "EMAIL", "PASSWORD", "ROLE"));

    backlog.tasks[0].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe`;
    backlog.tasks[1].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=Paola+Guarasci`;
    backlog.tasks[2].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=Ciccio+Pasticcio`;

    this.backlog = backlog;
    this.sprint = sprint;
    let tmpS = _.clone(sprint);
    let tmpB = _.clone(backlog);
    this.store.dispatch(TaskActions.setBacklogAction({ backlog: tmpB }));
    this.store.dispatch(TaskActions.setSprintAction({ sprint: tmpS }));
  }

  getFromApi() {
    let that = this;
    console.log('GET FROM API');
    this.backlogAPIService.getBacklog().subscribe((response) => {
      that.backlog = _.clone(response);
    });

    this.backlogAPIService.getSprint().subscribe((response) => {
      this.sprint = _.clone(response);
    });
  }

  save() {
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
}
