import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {mesProduitsapiService} from "../../services/mesproduitsapi.service";
/**
 * Generated class for the MalistedecoursePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-malistedecourse',
  templateUrl: 'malistedecourse.html',
})
export class MalistedecoursePage {
  listCourse : any;
  token: string;
  private loader;
  lengthData: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private mesproduitApiService: mesProduitsapiService,public alertCtrl: AlertController) {
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
    this.mesproduitApiService.getMesProduits(this.token).then(data => {
      this.loader.dismiss();
      console.log(data.data);
      this.lengthData = data.data.length;
      this.listCourse = data.data;

    })
      .catch(error => {
        console.log(error);

      });
  }
  DeleteProduit(id_prod)
  {
    this.mesproduitApiService.deleteProduit(this.token,id_prod).then(
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
