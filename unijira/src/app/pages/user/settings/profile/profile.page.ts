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
  ngOnInit() {
    this.user = new UserInfo(null,null,null,null,null,null,
      null,null,null,null,null,null,null, null,
      null);
    this.accountService.me().subscribe(value => {this.user = value;});
    this.sampleInit();
  }
  copyBack() {
    this.dummy();
  }// Just print object
  dummy() {
    console.log(this.user);
  }


}
