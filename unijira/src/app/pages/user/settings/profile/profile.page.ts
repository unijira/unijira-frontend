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
    private pageService: PageService
  ) {
    this.pageService.setTitle('profile');
  }

  ngOnInit() {
    this.user = new UserInfo(null, null, null, null, null, null,
      null, null, null, null, null, null, null, null,
      null);
    this.accountService.me().subscribe(value => {
      this.usersService.getUser(value.id).subscribe(user => {
        this.user = user;
        this.getCollaborators();
        this.getMemberships();
        this.image = this.user.avatar?.toString() || '';
        if (user.createdAt != null) {
          this.splitDate(this.user.createdAt?.toString());
        }
        this.pageService.setTitle(['profile', this.user.username]);
      });

      this.preferredLanguage ='italian';
      this.preferredTheme='light';

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

    this.preferredTheme = value;
  }

  setPreferredLanguage(value) {
    this.preferredLanguage = value;
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
    this.uploadImage();
  }

  uploadImage() {
    if(this.file !== undefined) {
      this.uploadService.upload(this.user.id, 'avatar', this.file, BasePath.user).subscribe(
        url => {
          this.user.avatar = new URL(url);
          this.usersService.updateUser(this.user.id, this.user).subscribe(value => {
          });
        }
          );
    }
    else {
        this.usersService.updateUser(this.user.id, this.user).subscribe(value => {
      });
    }

  }

  changePassword() {}

  onFileChanged(event) {
    const reader = new FileReader();

    this.file = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);
    this.user.avatar =  event.target.files[0];
    reader.onload = (e) => {
      this.image = e.target.result as string;
    };



  }
}
