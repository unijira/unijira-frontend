import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-wizard-info',
  templateUrl: './project-wizard-info.page.html',
  styleUrls: ['./project-wizard-info.page.scss'],
})
export class ProjectWizardInfoPage implements OnInit {

  public files: any[];

  constructor(){ this.files = []; }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }


}
