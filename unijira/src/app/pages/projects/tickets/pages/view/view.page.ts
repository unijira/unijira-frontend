import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../../../services/page.service';
import {SessionService} from '../../../../../store/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../../../../services/ticket/ticket.service';
import {Item} from '../../../../../models/item/Item';
import {ItemStatus} from '../../../../../models/item/ItemStatus';
import {MeasureUnit} from '../../../../../models/item/MeasureUnit';
import {Release} from '../../../../../models/releases/Release';
import {ReleaseService} from '../../../../../services/release/release.service';
import {ProjectService} from '../../../../../services/project/project.service';
import {MembershipStatus} from '../../../../../models/projects/MembershipStatus';
import {ReleaseStatus} from '../../../../../models/releases/ReleaseStatus';
import {Membership} from '../../../../../models/projects/Membership';
import {AlertController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ItemType} from '../../../../../models/item/ItemType';
import {catchError, of} from 'rxjs';
import {EvaluationProposal} from '../../../../../models/item/EvaluationProposal';
import {AccountService} from '../../../../../services/account.service';
import {UserInfo} from '../../../../../models/users/UserInfo';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  @ViewChild('evaluate') evaluateAccordion;

  projectId: number;

  ticket: Item = null;
  initialTicket: string;
  memberships: Membership[];
  releases: Release[];
  propose: EvaluationProposal;
  proposals: EvaluationProposal[] = [];

  me: UserInfo;

  ticketStatus = ItemStatus;
  measureUnit = MeasureUnit;
  ticketType = ItemType;

  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private ticketService: TicketService,
    private releaseService: ReleaseService,
    private projectService: ProjectService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private translateService: TranslateService,
    private toastController: ToastController,
    private router: Router
  ) { }


  get dirty(): boolean {
    return JSON.stringify(this.ticket || {}) !== this.initialTicket;
  }

  get hint(): number {
    return (this.proposals && Math.ceil(this.proposals
      .map(p => p.evaluation)
      .reduce((a, b) => a + b, 0) / this.proposals.length)) || 0;
  }


  ngOnInit() {

    this.pageService.setTitle('projects.tickets.title');

    this.activatedRoute.params.subscribe(params => {

      this.projectId = params.id;
      this.sessionService.loadProject(params.id);

      this.ticketService.getTicket(this.projectId, params.ticket).subscribe(ticket => {

        this.pageService.setTitle(['projects.tickets.title' , `#${ticket.id}`]);
        this.initialTicket = JSON.stringify(ticket);
        this.ticket = ticket;

        this.ticketService.getProposals(this.projectId, params.ticket).subscribe(proposals => {
          this.proposals = proposals.reverse();
          this.accountService.me().subscribe(me => {
            this.me = me;
            this.propose = new EvaluationProposal(this.ticket.id, this.me.id, 1, '');
          });
        });

      });

      this.releaseService.getReleases(this.projectId).subscribe(releases => {
        this.releases = releases
          .filter(i => i.status === ReleaseStatus.draft);
      });

      this.projectService.getMemberships(this.projectId).subscribe(memberships => {
        this.memberships = memberships
          .filter(i => i.status === MembershipStatus.enabled);
      });

    });

  }


  save() {
    this.ticketService.updateTicket(this.projectId, this.ticket).subscribe(ticket => {
      if(ticket) {

        this.ticket = ticket;
        this.initialTicket = JSON.stringify(this.ticket);

        this.toastController.create({
          message: this.translateService.instant('projects.tickets.view.save.success'),
          duration: 3000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-circle-outline'
        }).then(toast => toast.present());

      } else {
        this.alertController.create({
          header: this.translateService.instant('error.title'),
          message:  this.translateService.instant('error.projects.tickets.save'),
          buttons: [this.translateService.instant('error.buttons.ok')]
        }).then(alert => alert.present());
      }
    });
  }

  remove() {
    this.alertController.create({
      header: this.translateService.instant('projects.tickets.remove.title'),
      message: this.translateService.instant('projects.tickets.remove.message'),
      buttons: [
        {
          text: this.translateService.instant('projects.tickets.remove.cancel'),
          role: 'cancel'
        },
        {
          text: this.translateService.instant('projects.tickets.remove.confirm'),
          handler: () => {
            this.ticketService.removeTicket(this.projectId, this.ticket).subscribe(response => {

              if(response) {
                this.router.navigate(['/projects', this.projectId, 'tickets']).then();
              } else {
                this.alertController.create({
                  header: this.translateService.instant('error.title'),
                  message:  this.translateService.instant('error.projects.tickets.remove'),
                  buttons: [this.translateService.instant('error.buttons.ok')]
                }).then(alert => alert.present());
              }

            });
          }
        }
      ]
    }).then(alert => alert.present());
  }

  create(itemType: ItemType) {
    this.ticketService.createTicket(this.projectId, itemType, this.ticket.id)
      .pipe(catchError(_ => of(null)))
      .subscribe(response => {
        if (response) {
          this.router.navigate(['/projects', this.projectId, 'tickets', response.id]).then();
        } else {
          this.alertController.create({
            header: this.translateService.instant('error.title'),
            message: this.translateService.instant('error.projects.tickets.create'),
            buttons: [this.translateService.instant('error.buttons.ok')]
          }).then(alert => alert.present());
        }
      });
  }

  toggle() {
    this.evaluateAccordion.value = this.evaluateAccordion.value ? '' : 'evaluations';
  }

  createProposal() {
    this.ticketService.createProposal(this.projectId, this.ticket.id, this.propose).subscribe(proposal => {
      if(proposal) {

        this.proposals = [proposal, ...this.proposals];
        this.propose = new EvaluationProposal(this.ticket?.id, this.me?.id, 1, '');
        this.toggle();

        this.toastController.create({
          message: this.translateService.instant('projects.tickets.proposal.success'),
          duration: 3000,
          position: 'top',
          color: 'success',
          icon: 'checkmark-circle-outline'
        }).then(toast => toast.present());

      } else {
        this.alertController.create({
          header: this.translateService.instant('error.title'),
          message:  this.translateService.instant('error.projects.tickets.proposal.create'),
          buttons: [this.translateService.instant('error.buttons.ok')]
        }).then(alert => alert.present());
      }
    });
  }

}
