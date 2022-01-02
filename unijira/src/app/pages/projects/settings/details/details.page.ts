import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {SessionService} from '../../../../store/session.service';
import {ProjectService} from '../../../../services/common/project.service';
import {FormControl, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  @Input() file: File;
  @Input() image: string;

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  nameForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  keyForm: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute) {

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {
      this.project = p;
    });

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));

  }
  ngOnInit() {
    this.image = '';
    this.nameForm.setValue(this.project && this.project.name);
    this.keyForm.setValue(this.project && this.project.key);
  }

  onChangeTime(value: string) {

    if(this.nameForm.value.length >= 3) {

      let name = this.nameForm.value;
      name = name.replace(/\s+/g, '');
      const len = name.length;

      this.keyForm.setValue([name[0],
        name[len % 2 ? Math.floor(len / 2) : Math.floor(len / 2)],
        name[len - 1]]
        .join('').toUpperCase());

    } else {
      this.keyForm.setValue('');
    }

  }

  onFileChanged(event) {

    const reader = new FileReader();

    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (e) => {
      this.image = e.target.result as string;
    };

  }

  save() {

  }

  delete() {

  }

}
