import {Component, OnInit} from '@angular/core';
import {SessionService} from "../store/session.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private sessionService: SessionService, private translate: TranslateService) {}

  ngOnInit() {
    this.sessionService.toggleLoading(true);
    setTimeout(() => this.sessionService.toggleLoading(false), 5000);
  }

}
