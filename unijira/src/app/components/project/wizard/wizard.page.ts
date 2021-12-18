import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.page.html',
  styleUrls: ['./wizard.page.scss'],
})
export class WizardPage implements OnInit {

  @Input() info: boolean;
  @Input() invite: boolean;

  constructor() { }

  ngOnInit() {
    this.info = true;
    this.invite = false;
  }

  continue() {
    this.info = false;
    this.invite = true;
  }

  complete() {

  }

}
