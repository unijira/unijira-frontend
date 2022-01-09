import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http-service.service';
import {AccountService} from '../../../../services/account.service';
import {UserInfo} from '../../../../models/users/UserInfo';
import {Project} from '../../../../models/projects/Project';
import {UserService} from '../../../../services/user/user.service';
import {BasePath, FileUploadService} from '../../../../services/file-upload/file-upload.service';


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
    private uploadService: FileUploadService
  ) {
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
        this.image = this.user.avatar.toString();
        if (user.createdAt != null) {
          this.splitDate(this.user.createdAt.toString());
        }

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
      console.log(this.file);
      this.uploadService.upload(this.user.id, 'avatar', this.file, BasePath.user).subscribe(
        url => {
          console.log(url);
          this.user.avatar = new URL(url);
          console.log(this.user);
          this.usersService.updateUser(this.user.id, this.user).subscribe(value => {
            console.log(value);
          });
        }
          );
    }
    else {
        console.log(this.user);
        this.usersService.updateUser(this.user.id, this.user).subscribe(value => {
          console.log(value);
      });
    }

  }

  changePassword() {
    console.log('OK');
  }

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
