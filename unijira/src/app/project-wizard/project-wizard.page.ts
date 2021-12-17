import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-wizard',
  templateUrl: './project-wizard.page.html',
  styleUrls: ['./project-wizard.page.scss'],
})
export class ProjectWizardPage implements OnInit {

  info = true;
  invite = false;

  constructor() { }

  ngOnInit() {
  }

}
