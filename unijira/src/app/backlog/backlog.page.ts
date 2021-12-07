import { Observable } from 'rxjs';
import { taskReducer } from '../store/task.reducer';
import { monthsName } from './../util';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Sprint } from '../models/Sprint';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { TaskService } from '../store/task.service';
import * as TaskActions from '../store/task.action';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  sprint: Sprint = new Sprint();
  backlog: Sprint = new Sprint();

  backlog$ = this.taskService.getBacklog();
  sprint$ = this.taskService.getSprint();

  startSpring: String;
  endSpring: String;
  monthNames = monthsName;

  constructor(
    private dragulaService: DragulaService,
    private toastController: ToastController,
    private taskService: TaskService,
    private store: Store
  ) {
    this.populate();
    this.taskService.getBacklog();
    this.taskService.getSprint();

    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {});
    let that = this;
    this.dragulaService
      .drop('bag')
      .subscribe(({ name, el, source }) => {
        this.store.dispatch(
          TaskActions.setBacklogAction({ backlog: this.backlog })
        );
        that.store.dispatch(
          TaskActions.setSprintAction({ sprint: this.sprint })
        );
      })
      .add(() => {});

    this.dragulaService.dropModel('bag').subscribe(({ item }) => {});

    this.dragulaService.createGroup('bag', {
      removeOnSpill: false,
    });

    this.taskService.getBacklog().subscribe((b) => {
      console.log(b);
    });
    this.taskService.getSprint().subscribe((b) => {
      console.log(b);
    });
  }

  ngOnInit() {}
  addTask() {
    let task = new Task();
    task.name = 'Task random';
    task.type = 'task';
    task.status = 'da completare';
    task.weight = 1;
    task.children = [];
    task.assignedTo = [];
    task.assignedTo.push(new User());
    task.assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe`;
    let backlog = Object.assign({}, this.backlog);
    backlog.tasks.push(task);
    this.store.dispatch(TaskActions.setBacklogAction({ backlog: backlog }));
  }
  populate() {
    console.log('pop ');
    let sprint = new Sprint();
    let backlog = new Sprint();
    sprint.start = new Date('2021-11-18');
    sprint.end = new Date('2021-12-18');

    // startSpring = `${sprint.start.getDay()} ${
    //   monthNames[sprint.start.getMonth()]
    // }`;
    // endSpring = `${sprint.end.getDay()} ${monthNames[sprint.end.getMonth()]}`;

    backlog.tasks = [];
    backlog.tasks.push(new Task());
    backlog.tasks.push(new Task());
    backlog.tasks.push(new Task());
    backlog.tasks[0].name = 'Task 0';
    backlog.tasks[1].name = 'Task 1';
    backlog.tasks[2].name = 'Task 2';

    backlog.tasks[0].type = 'task';
    backlog.tasks[1].type = 'task';
    backlog.tasks[2].type = 'task';

    backlog.tasks[0].status = 'da completare';
    backlog.tasks[1].status = 'completata';
    backlog.tasks[2].status = 'in corso';

    backlog.tasks[0].weight = 1;
    backlog.tasks[1].weight = 2;
    backlog.tasks[2].weight = 3;

    backlog.tasks[0].children = [];
    backlog.tasks[0].children.push(new Task());
    backlog.tasks[0].children.push(new Task());
    backlog.tasks[0].children.push(new Task());

    backlog.tasks[0].assignedTo = [];
    backlog.tasks[0].assignedTo.push(new User());
    backlog.tasks[1].assignedTo = [];
    backlog.tasks[1].assignedTo.push(new User());
    backlog.tasks[2].assignedTo = [];
    backlog.tasks[2].assignedTo.push(new User());

    backlog.tasks[0].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe`;
    backlog.tasks[1].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=Paola+Guarasci`;
    backlog.tasks[2].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=Ciccio+Pasticcio`;

    sprint.tasks = [];
    sprint.tasks.push(new Task());
    sprint.tasks[0].name = 'Task N';
    this.backlog = backlog;
    this.sprint = sprint;
    this.store.dispatch(TaskActions.setBacklogAction({ backlog: backlog }));
    this.store.dispatch(TaskActions.setSprintAction({ sprint: sprint }));
  }
}
