import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../../../store/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DiscussionsService} from '../../../../services/discussions/discussions.service';
import {Project} from '../../../../models/projects/Project';
import {Topic} from '../../../../models/topic/Topic';
import {first, Subscription} from 'rxjs';
import {UserInfo} from '../../../../models/users/UserInfo';
import {UserService} from '../../../../services/user/user.service';
import {presentToast, showAlertConfirmDiscard, unsubscribeAll} from '../../../../util';
import {AlertController, IonTextarea, ToastController} from '@ionic/angular';
import {FormControl} from '@angular/forms';
import {Message} from '../../../../models/topic/Message';
import {TopicType} from '../../../../models/topic/TopicType';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.page.html',
  styleUrls: ['./discussion.page.scss'],
})
export class DiscussionPage implements OnInit, OnDestroy {

  @ViewChild('scrollMe') myScrollContainer: any;
  @ViewChild('input') answerInput: IonTextarea;

  project: Project;
  projectSubscription: Subscription;

  user: UserInfo;

  discussion: Topic;
  idDiscussion: number;

  answers: Message[];
  toReply: Message = null;

  answerToEdit: Message = null;

  isModalOpen = false;

  otherDiscussions: Topic[] = [];
  topicType = TopicType;

  answerFC: FormControl = new FormControl('');

  constructor(private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private discussionsService: DiscussionsService,
              private userService: UserService,
              private toastController: ToastController,
              private router: Router,
              private alertController: AlertController,
              private translateService: TranslateService) {

    this.activatedRoute.params.subscribe(params => {
      this.sessionService.loadProject(params.id);
      this.idDiscussion = params.idTopic;
    });

    this.sessionService.getUserInfo().pipe(first()).subscribe(u => this.user = u);

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {

      this.project = p;
      if (p) {

        if (this.idDiscussion) {
          this.discussionsService.getDiscussion(this.project.id, this.idDiscussion).subscribe(d => {

            this.discussion = d;
            this.userService.getUser(d.userId).subscribe(u => this.discussion.user = u);
            this.discussionsService.getMessages(this.project.id, this.discussion.id).subscribe(m => {
              if (m) {
                this.answers = m;
                this.answers.forEach(a => {
                  if (a) {
                    this.userService.getUser(a.authorId).subscribe(u => a.user = u);
                    this.answers.forEach(a1 => {
                      if (a1 && a.repliesToId && a.repliesToId === a1.id) {
                        a.repliesTo = a1;
                      }
                    });
                  }
                });
              }
            });
            this.discussionsService.getDiscussions(this.project.id).subscribe(topics => {
              topics.forEach(t => {
                if (this.otherDiscussions.length < 3) {
                  if (t.id !== this.discussion.id && !this.otherDiscussions.some(ot => ot.id === t.id)) {
                    this.otherDiscussions.push(t);
                    return true;
                  }
                }
              });

            });
          });
        }

      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    unsubscribeAll(this.projectSubscription);
  }

  deleteDiscussion() {

    showAlertConfirmDiscard(this.alertController,
      this.translateService.instant('discussions.areYouSureYouWantToDeleteTheDiscussion'),
      this.translateService.instant('discussions.opeartionWillNoteBeReversible'),
      this.translateService.instant('discussions.cancel'),
      this.translateService.instant('discussions.confirm')).then(result => {
      if (result) {
        this.discussionsService.deleteDiscussion(this.project.id, this.discussion.id).subscribe(() => {
          presentToast(this.toastController, this.translateService.instant('discussions.discussionDeleted'), false).then();
          this.router.navigate(['projects', this.project.id, 'discussions']).then();
        });
      }
    });
  }

  addAnswer() {
    if (this.answerFC.value.length === 0) {
      presentToast(this.toastController, this.translateService.instant('discussions.answerCantBeEmpty'), true).then();
    } else if (this.answerFC.value.length > 250) {
      presentToast(this.toastController,
        this.translateService.instant('discussions.answerCantBeLongerThan250Characters'), true).then();
    } else {
      const message = new Message(null, this.answerFC.value, this.discussion.id, this.user.id,
        this.user.username, this.toReply ? this.toReply.id : null);
      this.discussionsService.createMessage(this.project.id, this.discussion.id, message)
        .subscribe(m => {
          m.user = this.user;
          this.answers.push(m);
          this.answerFC.reset();
          this.toReply = null;
        });
    }
  }

  deleteAnswer(idMessage: number, index: number) {

    showAlertConfirmDiscard(this.alertController,
      this.translateService.instant('discussions.areYouSureYouWantToDeleteTheArswer'),
      this.translateService.instant('discussions.opeartionWillNoteBeReversible'),
      this.translateService.instant('discussions.cancel'),
      this.translateService.instant('discussions.confirm')).then(result => {
        if (result) {
          this.discussionsService.deleteMessage(this.project.id, this.discussion.id, idMessage).subscribe(() => {
            this.answers.splice(index, 1);
            presentToast(this.toastController, this.translateService.instant('discussions.answerDeleted'), false).then();
          });
        }
    });
  }

  scrollToBottomAndAnswer(answer: Message) {
    this.myScrollContainer.scrollToBottom(400);
    setTimeout(() => this.answerInput.setFocus().then(), 400);
    this.toReply = answer;
  }

  scrollToBottomAndEdit(answer: Message) {
    this.myScrollContainer.scrollToBottom(400);
    setTimeout(() => this.answerInput.setFocus().then(), 400);
    this.toReply = answer.repliesTo;
    this.answerFC.setValue(answer.text);
    this.answerToEdit = answer;
  }

  editAnswer() {
    if (this.answerToEdit) {
      this.answerToEdit.text = this.answerFC.value;
      this.discussionsService.updateMessage(this.project.id, this.discussion.id, this.answerToEdit).subscribe(m => {
        const i = this.answers.indexOf(this.answerToEdit);
        this.answers.splice(i, 1);
        m.user = this.user;
        this.answers.push(m);
        this.answerFC.reset();
        this.answerToEdit = null;
      });
    }
  }

  cancelAnswerOrEdit() {
    this.toReply = null;
    this.answerToEdit = null;
    this.answerFC.reset();
  }

}
