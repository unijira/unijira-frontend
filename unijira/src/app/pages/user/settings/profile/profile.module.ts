import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfilePageRoutingModule} from './profile-routing.module';

import {ProfilePage} from './profile.page';
import {TranslateModule} from '@ngx-translate/core';
import {UserinfoComponent} from '../../../../components/user/userinfo/userinfo.component';
import {UsersettingsComponent} from '../../../../components/user/usersettings/usersettings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        TranslateModule
    ],
  declarations: [
    ProfilePage,
    UsersettingsComponent,
    UserinfoComponent],
  exports: [UsersettingsComponent,UserinfoComponent],
})
export class ProfilePageModule {}
