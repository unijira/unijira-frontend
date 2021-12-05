import { Component, OnInit, ViewChild } from '@angular/core';
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
  backlog: Task[];

  constructor(
    private dragulaService: DragulaService,
    private toastController: ToastController
  ) {
    this.sprint.tasks = [];
    this.sprint.tasks.push(new Task());
    this.sprint.tasks.push(new Task());
    this.sprint.tasks.push(new Task());
    this.sprint.tasks[0].name = 'Task 0';
    this.sprint.tasks[1].name = 'Task 1';
    this.sprint.tasks[2].name = 'Task 2';

    this.backlog = [];
    this.backlog.push(new Task());
    this.backlog[0].name = 'Task N';

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
