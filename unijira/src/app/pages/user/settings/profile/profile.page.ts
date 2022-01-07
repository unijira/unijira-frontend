import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http-service.service';
import {AccountService} from '../../../../services/account.service';
import {UserInfo} from '../../../../models/users/UserInfo';
import {Project} from '../../../../models/projects/Project';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @Input() user: UserInfo;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() username: string;
  @Input() avatar: URL;
  @Input() createdAt: Date;
  @Input() updatedAt: Date;
  @Input() role: string;
  @Input() description: string;
  @Input() github: string;
  @Input() linkedin: string;
  @Input() phoneNumber: string;
  @Input() birthdate: string;

  enrolledProjects: Project[] = [];
  collaborators: UserInfo[] = [];
  constructor(
    private http: HttpService,
    private accountService: AccountService
  ) { }
  sampleInit() {
    const project = new Project(1,'Supersecret Project of NASA','SPN',
      null,null);
    const project2 = new Project(8,'Unijira Bellissimo','UJR',
      null,null);
    this.enrolledProjects.push(project,project2,project,project2,project,project2,project);
    const collab = new UserInfo(1,'ajejebrazorf@gmail.com',
      null,false, false, null, null,
      null,'Ajeje','Brazorf',null,null,null,null,null);
    this.collaborators.push(collab,collab,collab,collab,collab,collab,collab);

  }
  copyAll(userinfo: UserInfo) {
    this.user = userinfo;
    if (!this.user.firstName === null) {
      this.firstName = this.user.firstName;
    }
    if (!this.user.username === null) {
      this.username = this.user.username;
    }
    if (!this.user.lastName === null) {
      this.lastName = this.user.lastName;
    }
    if (!this.user.avatar === null) {
      this.avatar = this.user.avatar;
    }
    if (!this.user.role === null) {
      this.role = this.user.role;
    }
    if (!this.user.github === null) {
      this.github = this.user.github;
    }
    if (!this.user.description === null) {
      this.description = this.user.description;
    }
    if (!this.user.createdAt === null) {
      this.createdAt = this.user.createdAt;
    }
    if (!this.user.updatedAt === null) {
      this.updatedAt = this.user.updatedAt;
    }
    if (!this.user.linkedin === null) {
      this.linkedin = this.user.linkedin;
    }
    if (!this.user.phoneNumber === null) {
      this.phoneNumber = this.user.phoneNumber;
    }
  }
  ngOnInit() {
    this.accountService.me().subscribe(value => this.copyAll(value));
    this.sampleInit();
  }
  copyBack() {
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.username = this.username;
    this.user.role = this.role;
    this.user.avatar = this.avatar;
    this.user.description = this.description;
    this.user.linkedin = this.linkedin;
    this.user.github = this.github;
    this.user.phoneNumber = this.phoneNumber;
    this.dummy();
  }// Just print object
  dummy() {
    console.log(this.user);
  }


}
