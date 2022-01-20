import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../../../store/session.service";
import {ActivatedRoute} from "@angular/router";
import {DiscussionsService} from "../../../../services/discussions/discussions.service";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.page.html',
  styleUrls: ['./discussion.page.scss'],
})
export class DiscussionPage implements OnInit {

  constructor(private sessionService: SessionService,
              private activatedRoute: ActivatedRoute,
              private discussionsService: DiscussionsService) { }

  ngOnInit() {
  }

}
