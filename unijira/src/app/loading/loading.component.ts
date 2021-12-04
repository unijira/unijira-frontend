import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {

  constructor(public loadingController: LoadingController) { }

  loading: any;

  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'bubbles',
      cssClass: 'loading-class',
      message: 'Please wait...',
      duration: 120000
    });
    await this.loading.present();

    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
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
