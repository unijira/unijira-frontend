import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TopicType} from '../../../../models/topic/TopicType';
import {Project} from '../../../../models/projects/Project';
import {SessionService} from '../../../../store/session.service';
import {UserInfo} from '../../../../models/users/UserInfo';
import {first} from 'rxjs';
import {DiscussionsService} from '../../../../services/discussions/discussions.service';
import {Topic} from '../../../../models/topic/Topic';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {presentToast} from '../../../../util';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.component.html',
  styleUrls: ['./new-discussion.component.scss'],
})
export class NewDiscussionComponent implements OnInit {

  @Input()
  project: Project;

  @Output()
  closeModule: EventEmitter<boolean> = new EventEmitter<boolean>();

  topicType = TopicType;
  user: UserInfo;

  titleFC: FormControl = new FormControl('');
  descriptionFC: FormControl = new FormControl('');
  typeRadioFC: FormControl = new FormControl('');

  formGroup: FormGroup = new FormGroup({
    title: this.titleFC,
    description: this.descriptionFC,
    type: this.typeRadioFC
  });

  discussionToEdit: Topic = null;

  constructor(private sessionService: SessionService,
              private discussionsService: DiscussionsService,
              private router: Router,
              private toastController: ToastController,
              private translateService: TranslateService) {
    this.sessionService.getUserInfo().pipe(first()).subscribe(u => this.user = u );
  }

  @Input()
  set toEdit(discussion: Topic) {
    this.discussionToEdit = discussion;
    if (discussion) {
      this.titleFC.setValue(discussion.title);
      this.descriptionFC.setValue(discussion.content);
      this.typeRadioFC.setValue(discussion.type);
    }
  }


  ngOnInit() {
    this.typeRadioFC.setValue(this.topicType.general);
  }

  newOrEditDiscussion() {

    if (!this.titleFC.value || !this.descriptionFC.value) {
      presentToast(this.toastController, this.translateService.instant('discussions.titleAndTextCantBeEmpty'), true).then();
    } else if (this.titleFC.value.length > 250) {
      presentToast(this.toastController, this.translateService.instant('discussions.titleCantBeLongerThan250Char'), true).then();
    } else if (this.descriptionFC.value.length > 1000) {
      presentToast(this.toastController, this.translateService.instant('discussions.contentCantBeLongerThan1000Char'), true).then();
    } else {

      this.closeModule.emit(true);
      if (this.discussionToEdit) {
        this.discussionToEdit.title = this.titleFC.value;
        this.discussionToEdit.content = this.descriptionFC.value;
        this.discussionToEdit.type = this.typeRadioFC.value;
        this.discussionsService.updateDiscussion(this.project.id, this.discussionToEdit).subscribe(discussion => {
          if (discussion) {
            this.router.navigate(['/projects/' + this.project.id + '/discussions/' + discussion.id]).then();
            presentToast(this.toastController, this.translateService.instant('discussions.discussionEdited'), false).then();
          }
        });
      } else {
        this.discussionsService.createDiscussion(this.project.id, new Topic(
          null,
          this.titleFC.value,
          this.descriptionFC.value,
          this.project.id,
          this.user.id,
          this.typeRadioFC.value)).subscribe(discussion => {
            if (discussion) {
              this.router.navigate(['/projects/' + this.project.id + '/discussions/' + discussion.id]).then();
              presentToast(this.toastController, this.translateService.instant('discussions.newDiscussionCreated'), false).then();
            }
          });
      }
    }

  }

}
