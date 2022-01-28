import {Component, Input, OnInit} from '@angular/core';
import {UserInfo} from '../../../models/users/UserInfo';
import {Project} from '../../../models/projects/Project';
import {HttpService} from '../../../services/http-service.service';
import {AccountService} from '../../../services/account.service';
import {UserService} from '../../../services/user/user.service';
import {BasePath, FileUploadService} from '../../../services/file-upload/file-upload.service';



@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss'],
})
export class UserinfoComponent implements OnInit {

  @Input() user: UserInfo;
  @Input() enrolledProjects: Project[] = [];
  @Input() collaborators: UserInfo[] = [];

  @Input() file: File;
  @Input() image: string;

  @Input() saved = false;

  @Input() editMode='no';

  @Input()preferredTheme='';
  @Input()preferredLanguage='';

  @Input() newPassword: string;

  monthAsString='';
  yearAsString='';

  editModeBoolean= false;

  constructor(private http: HttpService,
              private accountService: AccountService,
              private usersService: UserService,
              private uploadService: FileUploadService) {
    console.log(this.user);
  }

  ngOnInit(): void {
    console.log(this.user);
    if (this.user.createdAt != null) {
      this.splitDate(this.user.createdAt?.toString());
    }
    this.editModeBoolean = this.editMode === 'yes';
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





  update() {
    this.uploadImage();
    this.usersService.updateUser(this.user.id, this.user).subscribe(value => {});
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
