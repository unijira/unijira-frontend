import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {SessionService} from '../../store/session.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-action-popover',
  templateUrl: './user-action-popover.component.html',
  styleUrls: ['./user-action-popover.component.scss'],
})
export class UserActionPopoverComponent implements OnInit {

  constructor(private popCtrl: PopoverController, public sessionService: SessionService, public translate: TranslateService) { }

  ngOnInit() {}

  dismissPopover() {
    this.popCtrl.dismiss({}).then();
   }

  logOut() {
    this.sessionService.logout();
    this.dismissPopover();
  }

}
