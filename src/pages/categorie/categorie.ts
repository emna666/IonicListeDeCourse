import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {SupermarchesModel} from "../../models/supermarches.model";
import {SupermarcheapiService} from "../../services/supermarcheapi.service";
import {ProduitPage} from "../produit/produit";

/**
 * Generated class for the CategoriePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html',
})
export class CategoriePage {
  supermarche: SupermarchesModel = new SupermarchesModel();
  token: string;
  idSup: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public supermarcheApiService: SupermarcheapiService, private viewCtrl: ViewController) {
    this.token = localStorage.getItem("token");
    this.getSupermarches(null);
  }
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  public getSupermarches(refresher){
    this.supermarcheApiService.getSupermarches(this.token)
      .then(newsFetched => {
        this.supermarche = newsFetched;

        (refresher) ? refresher.complete() : null;
        this.idSup = newsFetched.data.id;
        console.log(newsFetched.data);
      });

  }
    PassProduit(id_sup)
    {
      this.navCtrl.push(ProduitPage);
      localStorage.setItem('idSupermarche', id_sup);
    }
}
