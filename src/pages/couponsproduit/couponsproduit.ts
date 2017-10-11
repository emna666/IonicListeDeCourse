import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {couponsbyproductService} from "../../services/couponsbyproduct.service";

/**
 * Generated class for the CouponsproduitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-couponsproduit',
  templateUrl: 'couponsproduit.html',
})
export class CouponsproduitPage {

  coupons : any;
  prodName: any;
  idProoduit: string;
  token: string;
  private loader;
  searchQuery: string = '';

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public loadingCtrl: LoadingController, private couponsbyproductService: couponsbyproductService,public alertCtrl: AlertController) {
    this.token = localStorage.getItem("token");
    this.idProoduit =  localStorage.getItem("idProduit");
    console.log(this.idProoduit);
    this.getCoupons();
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

  public getCoupons(){
    this.loading();
    this.couponsbyproductService.getCoupons(this.token,this.idProoduit).then(data => {
      this.loader.dismiss();
      console.log(data.data);
      this.prodName = data.data.libelle;
      this.coupons = data.data.coupons;

    })
      .catch(error => {
        console.log(error);

      });
  }
  addCoupons(id_coup)
  {
    this.couponsbyproductService.setCoupons(this.token,id_coup).then(
      response => {
        this.loader.dismiss();
        console.log(response);
        if(response.code !=200)
        {
          this.showAlert("Erreur !",response.message)
        }else
        {
          this.showAlert("Félicitation !",response.message)
        }
      });
  }
}
