import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TopicType} from '../../../../models/topic/TopicType';
import {Project} from '../../../../models/projects/Project';
import {SessionService} from '../../../../store/session.service';
import {UserInfo} from '../../../../models/users/UserInfo';
import {first} from "rxjs";
import {DiscussionsService} from "../../../../services/discussions/discussions.service";
import {Topic} from "../../../../models/topic/Topic";

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.component.html',
  styleUrls: ['./new-discussion.component.scss'],
})
export class NewDiscussionComponent implements OnInit {

  @Input()
  project: Project;

  user: UserInfo;

  titleFC: FormControl = new FormControl('', [Validators.required, Validators.maxLength(150)]);
  descriptionFC: FormControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);
  typeRadioFC: FormControl = new FormControl('');

  formGroup: FormGroup = new FormGroup({
    title: this.titleFC,
    description: this.descriptionFC,
    type: this.typeRadioFC
  });

  topicType = TopicType;

  constructor(private sessionService: SessionService, private discussionsService: DiscussionsService) {
    this.sessionService.getUserInfo().pipe(first()).subscribe(u => this.user = u );
  }

  ngOnInit() {
    this.typeRadioFC.setValue(this.topicType.general);
  }

  newDiscussion() {
    console.log(this.titleFC.value);
    console.log(this.descriptionFC.value);
    console.log(this.typeRadioFC.value);
    console.log(this.user.id);
    this.discussionsService.createDiscussion(this.project.id, new Topic(
      null,
      this.titleFC.value,
      this.descriptionFC.value,
      this.project.id,
      this.user.id,
      this.typeRadioFC.value)).subscribe(discussion => console.log(discussion));
  }

}
