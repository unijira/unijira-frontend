import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from '../../../models/users/UserInfo';
import {Project} from '../../../models/projects/Project';
import {HttpService} from '../../../services/http-service.service';
import {AccountService} from '../../../services/account.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user/user.service';
import {FileUploadService} from '../../../services/file-upload/file-upload.service';
import {PageService} from '../../../services/page.service';


@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.page.html',
  styleUrls: ['./profile-overview.page.scss'],
})
export class ProfileOverviewPage implements OnInit {

  @Input() user: UserInfo;

  @Input() oldPassword: string;
  @Input() newPassword: string;


  @Input() file: File;
  @Input() image: string;

  @Input() saved = false;

  preferredTheme='';
  preferredLanguage='';

  monthAsString='';
  yearAsString='';

  enrolledProjects: Project[] = [];

  collaborators: UserInfo[] = [];


  constructor(
    private http: HttpService,
    private accountService: AccountService,
    private usersService: UserService,
    private uploadService: FileUploadService,
    private route: ActivatedRoute,
    private pageService: PageService
  ) {
    this.pageService.setTitle('profile');
  }

  ngOnInit() {
    this.user = new UserInfo(null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null);
    this.route.params.subscribe(params => {
      console.log(params);
      const id = params.id;
      console.log(id);
      this.usersService.getUser(id).subscribe(user => {
        this.user = user;
        this.getCollaborators();
        this.getMemberships();
        this.image = this.user.avatar.toString();
        if (user.createdAt != null) {
          this.splitDate(this.user.createdAt.toString());
        }
        this.pageService.setTitle(['profile', this.user.username]);
      });




    });
  }


    splitDate(stringDate) {
      if(stringDate!=null) {
        const array = stringDate.split('-');
        if(array.length > 2) {
          this.yearAsString = array[0];
          this.monthAsString =array[1];
        }

      }

    }

    setPreferredTheme(value) {
      console.log('Setting preferred theme to '+value);
      this.preferredTheme = value;
    }

    setPreferredLanguage(value) {
      console.log('Setting preferred language to '+value);
      this.preferredLanguage = value;
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

    getMemberships()
    {
      this.usersService.getEnrolledProjects(this.user.id).subscribe(value => {
        this.enrolledProjects = value;
      });

    }
  }

