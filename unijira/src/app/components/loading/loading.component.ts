import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {

  loading: any;

  constructor(public loadingController: LoadingController, private translate: TranslateService) { }

  async presentLoading() {
    let loadingMesage = '';
    this.translate.get('loading', {value: 'world'}).subscribe((res: string) => loadingMesage = res);
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'loading-class',
      message: loadingMesage,
      duration: 120000
    });
    await this.loading.present();

    // const { role, data } = await this.loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }


  dismissLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }


  ngOnInit() {
    this.presentLoading();
  }

  ngOnDestroy() {
    this.dismissLoading();
  }
}
