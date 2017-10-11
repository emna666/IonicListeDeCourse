import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {mesCouponsapiService} from "../../services/mescouponsapi.service";

/**
 * Generated class for the MescouponsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-mescoupons',
  templateUrl: 'mescoupons.html',
})
export class MescouponsPage {
  listCoupons : any;
  token: string;
  private loader;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private mescouponsApiService: mesCouponsapiService,public alertCtrl: AlertController) {
    this.token = localStorage.getItem("token");
    this.getmesProduits();
  }
  showAlert(title:string,text:string) {
    let alert = this.alertCtrl.create({
      title: title,
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

  public getmesProduits(){
    this.loading();
    this.mescouponsApiService.getMesCoupons(this.token).then(data => {
      this.loader.dismiss();
      console.log(data.data);
      this.listCoupons = data.data;

    })
      .catch(error => {
        console.log(error);

      });
  }
  DeleteCoupons(id_coupon)
  {
    this.mescouponsApiService.deleteCoupons(this.token,id_coupon).then(
      response => {
        this.loader.dismiss();
        console.log(response);
        if(response.code !=200)
        {
          this.showAlert("Erreur !",response.message)
        }else
        {
          this.showAlert("Félicitation !",response.message)
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      });
  }
}
