import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {Topic} from '../../../models/topic/Topic';
import {UserInfo} from '../../../models/users/UserInfo';
import {UserStatus} from '../../../models/users/UserStatus';
import {TopicType} from '../../../models/topic/TopicType';
import {FormControl, FormGroup} from '@angular/forms';
import {cloneDeep} from 'lodash';
import {DiscussionsService} from '../../../services/discussions/discussions.service';
import {unsubscribeAll} from "../../../util";

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.page.html',
  styleUrls: ['./discussions.page.scss'],
})
export class DiscussionsPage implements OnInit, OnDestroy {

  project: Project;
  projectSubscription: Subscription;

  topics: Topic[] = [];
  filteredTopics: Topic[] = null;
  topicType = TopicType;

  typesCheckedFC: FormControl = new FormControl([]);
  searchFC: FormControl = new FormControl('');

  formGroup = new FormGroup({
    types: this.typesCheckedFC,
    search: this.searchFC
  })

  filterSubscription: Subscription;

  isModalOpen = false;

  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private discussionsService: DiscussionsService
    ) {

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {

      this.project = p;

      if (p) {
        this.discussionsService.getDiscussions(this.project.id).subscribe(top => {
          this.topics = top;

          // Mock objects for testing and demos, to remove
          // this.topics = [
          //   new Topic(0, 'topic 1', 'contenuto 1', 0, 0, TopicType.announcements),
          //   new Topic(1, 'topic 2', 'contenuto 2', 0, 0, TopicType.ideas),
          //   new Topic(2, 'topic 3', 'contenuto 3', 0, 0, TopicType.qanda),
          //   new Topic(3, 'topic 4', 'contenuto 4', 0, 0, TopicType.general),
          //   new Topic(4, 'topic 5', 'contenuto 5', 0, 0, TopicType.general),
          //   new Topic(4, 'topic 6', 'contenuto 5', 0, 0, TopicType.general),
          //   new Topic(4, 'topic 7', 'contenuto 5', 0, 0, TopicType.general),
          //   new Topic(4, 'topic 8', 'contenuto 5', 0, 0, TopicType.general),
          // ];
          //
          // this.topics.forEach(t => {
          //   t.numMessages = 10;
          //   t.user = new UserInfo(0, 'user0', new URL("https://pbs.twimg.com/profile_images/1194685097158627328/0KpY3jyd_400x400.png"),
          //     UserStatus.active, false, null, null, null, 'null', 'null');
          // });
          // end mock object

          this.topics.forEach((t, i) => {
            this.discussionsService.getNumMessages(this.project.id, t.id).subscribe(num => {
              t.numMessages = num;
              this.filteredTopics[i].numMessages = num;
            });
          });


          this.filteredTopics = cloneDeep(this.topics);

        });
      }

    });

    this.filterSubscription = this.formGroup.statusChanges.subscribe(() => this.filterItems())
  }

  ngOnInit() {
  }

  filterItems() {
    this.filteredTopics = cloneDeep(this.topics);
    this.filteredTopics = this.filteredTopics.filter(t => t.title.toLowerCase().includes(this.searchFC.value.toLowerCase()));
    if (this.typesCheckedFC.value && this.typesCheckedFC.value.length > 0) {
      this.filteredTopics = this.filteredTopics.filter(t => this.typesCheckedFC.value.includes(t.type));
    }
  }

  ngOnDestroy() {
    unsubscribeAll(this.filterSubscription, this.projectSubscription);
  }

}
