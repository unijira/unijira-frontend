import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service';
import {TicketService} from '../../../services/ticket/ticket.service';
import {Item} from '../../../models/item/Item';
import {SessionService} from '../../../store/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketDataTableComponent} from './components/ticket-data-table/ticket-data-table.component';
import {ItemType} from '../../../models/item/ItemType';
import {AlertController, ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  @ViewChild('ticketDataTable') ticketDataTable: TicketDataTableComponent;

  tickets: Item[] = null;
  projectId: number = null;

  ticketType = ItemType;


  constructor(
    private ticketService: TicketService,
    private pageService: PageService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private translateService: TranslateService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.pageService.setTitle('projects.tickets.title');
  }


  get filteredTickets(): Item[] {
    return this.ticketDataTable?.filteredTickets ?? [];
  }

  ngOnInit() {

    this.activatedRoute.params
      .subscribe(params => {

        this.sessionService.loadProject(params.id);
        this.projectId = params.id;

        this.ticketService.getTickets(this.projectId).subscribe(tickets => {
          this.tickets = tickets;
        });

      });

  }

  export() {
    this.ticketDataTable.export();
  }

  create(type: ItemType) {

    this.toastController.create({
      message: this.translateService.instant('projects.tickets.create.processing'),
      position: 'top',
      duration: 2000,
      icon: 'hourglass-outline'
    }).then(toast => toast.present());

    this.ticketService.createTicket(this.projectId, type, null).subscribe(ticket => {
      if(ticket) {
        this.router.navigate(['/projects', this.projectId, 'tickets', ticket.id]).then();
      } else {
        this.alertController.create({
          header: this.translateService.instant('error.title'),
          message: this.translateService.instant('error.projects.tickets.create'),
          buttons: [this.translateService.instant('error.buttons.ok')]
        }).then(alert => alert.present());
      }
    });
  }

}
