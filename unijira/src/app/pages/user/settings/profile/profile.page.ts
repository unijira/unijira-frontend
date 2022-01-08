import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http-service.service';
import {AccountService} from '../../../../services/account.service';
import {UserInfo} from '../../../../models/users/UserInfo';
import {Project} from '../../../../models/projects/Project';
import {UsersService} from '../../../../services/common/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @Input() user: UserInfo;

  enrolledProjects: Project[] = [];

  collaborators: UserInfo[] = [];


  constructor(
    private http: HttpService,
    private accountService: AccountService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.user = new UserInfo(null,null,null,null,null,null,
      null,null,null,null,null,null,null, null,
      null);
    this.accountService.me().subscribe(value => {
          this.user = value;
          this.getCollaborators();
          this.getMemberships();});
  }

  copyBack() {
    this.dummy();
  }// Just print object

  dummy() {
    console.log(this.user);
  }

  getCollaborators() {
    this.usersService.getCollaborators(this.user.id).subscribe(value => {
      this.collaborators = value;
    });
  }

  getMemberships() {
    this.usersService.getEnrolledProjects(this.user.id).subscribe(value => {
      this.enrolledProjects = value;
    });

  }

  update() {
    this.usersService.updateUser(this.user.id, this.user).subscribe(value =>{console.log(value);});

  }

  changePassword() {
    console.log('OK');
  }

}
