import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  info = true;
  invite = false;

  constructor() { }

  ngOnInit() {
  }

  continue() {
    this.info = false;
    this.invite = true;
  }

  complete() {

  }

}
