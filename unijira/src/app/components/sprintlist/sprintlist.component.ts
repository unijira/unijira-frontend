import { Component, OnInit } from '@angular/core';
import { Sprint } from '../../models/Sprint';
import { Task } from '../../models/Task';
import { User } from '../../models/User';

@Component({
  selector: 'app-sprintlist',
  templateUrl: './sprintlist.component.html',
  styleUrls: ['./sprintlist.component.scss'],
})
export class SprintlistComponent implements OnInit {

  sprintList: Sprint[];

  constructor() { }

  ngOnInit() {

  }




}
