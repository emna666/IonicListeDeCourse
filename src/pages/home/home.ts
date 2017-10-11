import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';

import {LoginService} from "../../services/login.service";
import {MapPage} from "../map/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private login="admin";
  private password="admin";
  private loader;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController, private loginService:LoginService,public alertCtrl: AlertController ) {

  }

  showAlert(text:string) {
    let alert = this.alertCtrl.create({
      title: 'Erreur!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }


  loading()
  {
    this.loader = this.loadingCtrl.create({
      content: "Loading ...",
    });
    this.loader.present();
  }

  connection()
  {
    this.loading();
    this.loginService.login(this.login,this.password).then(
      response => {
        this.loader.dismiss();
        if(response.code !=200)
        {
          this.showAlert(response.message)
        }else
        {
          this.navCtrl.setRoot(MapPage);
          localStorage.setItem('token', response.data.session.token);

        }
      });
  }
}
