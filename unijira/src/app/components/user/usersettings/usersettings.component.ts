import {Component, Input, OnInit} from '@angular/core';
import {UserPasswordReset} from '../../../models/users/UserPasswordReset';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.scss'],
})
export class UsersettingsComponent implements OnInit {

  @Input()preferredTheme='';
  @Input()preferredLanguage='';

  @Input() username: string;

 newPassword: string;




  constructor(private usersService: UserService) { }

  ngOnInit() {}


  setPreferredTheme(value) {
    this.preferredTheme = value;
  }

  setPreferredLanguage(value) {
    this.preferredLanguage = value;

  }

  changePassword() {
    const userChangePassword = new UserPasswordReset(this.newPassword, '');
    this.usersService.resetPassword(userChangePassword).subscribe(value => {});
  }

}
