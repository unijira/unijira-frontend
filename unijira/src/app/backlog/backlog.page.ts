import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Task } from '../models/Task';
import { Sprint } from '../models/Sprint';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.page.html',
  styleUrls: ['./backlog.page.scss'],
})
export class BacklogPage implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  sprint: Sprint = new Sprint();
  backlog: Sprint = new Sprint();
  startSpring: String;
  endSpring: String;

  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  constructor(
    private dragulaService: DragulaService,
    private toastController: ToastController
  ) {
    this.sprint.start = new Date('2021-11-18');
    this.sprint.end = new Date('2021-12-18');

    this.startSpring = `${this.sprint.start.getDay()} ${
      this.monthNames[this.sprint.start.getMonth()]
    }`;
    this.endSpring = `${this.sprint.end.getDay()} ${
      this.monthNames[this.sprint.end.getMonth()]
    }`;

    this.backlog.tasks = [];
    this.backlog.tasks.push(new Task());
    this.backlog.tasks.push(new Task());
    this.backlog.tasks.push(new Task());
    this.backlog.tasks[0].name = 'Task 0';
    this.backlog.tasks[1].name = 'Task 1';
    this.backlog.tasks[2].name = 'Task 2';

    this.backlog.tasks[0].type = 'task';
    this.backlog.tasks[1].type = 'task';
    this.backlog.tasks[2].type = 'task';

    this.backlog.tasks[0].status = 'da completare';
    this.backlog.tasks[1].status = 'completata';
    this.backlog.tasks[2].status = 'in corso';

    this.backlog.tasks[0].weight = 1;
    this.backlog.tasks[1].weight = 2;
    this.backlog.tasks[2].weight = 3;

    this.backlog.tasks[0].children = [];
    this.backlog.tasks[0].children.push(new Task());
    this.backlog.tasks[0].children.push(new Task());
    this.backlog.tasks[0].children.push(new Task());

    this.backlog.tasks[0].assignedTo = [];
    this.backlog.tasks[0].assignedTo.push(new User());
    this.backlog.tasks[0].assignedTo.push(new User());
    this.backlog.tasks[0].assignedTo.push(new User());

    this.backlog.tasks[0].assignedTo[0].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=John+Doe`;
    this.backlog.tasks[0].assignedTo[1].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=Paola+Guarasci`;
    this.backlog.tasks[0].assignedTo[2].avatar = `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=Ciccio+Pasticcio`;

    this.sprint.tasks = [];
    this.sprint.tasks.push(new Task());
    this.sprint.tasks[0].name = 'Task N';

    this.dragulaService.drag('bag').subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });

    this.dragulaService.removeModel('bag').subscribe(({ item }) => {
      this.toastController
        .create({
          message: 'Removed: ' + item.value,
          duration: 2000,
        })
        .then((toast) => toast.present());
    });

    this.dragulaService.dropModel('bag').subscribe(({ item }) => {
      item['color'] = 'success';
    });

    this.dragulaService.createGroup('bag', {
      removeOnSpill: true,
    });
  }

  ngOnInit() {}
}
