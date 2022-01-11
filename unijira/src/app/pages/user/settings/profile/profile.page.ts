import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http-service.service';
import {AccountService} from '../../../../services/account.service';
import {UserInfo} from '../../../../models/users/UserInfo';
import {Project} from '../../../../models/projects/Project';
import {UserService} from '../../../../services/user/user.service';
import {BasePath, FileUploadService} from '../../../../services/file-upload/file-upload.service';
import {PageService} from '../../../../services/page.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }




}
