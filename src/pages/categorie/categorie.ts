import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SupermarchesModel} from "../../models/supermarches.model";
import {SupermarcheapiService} from "../../services/supermarcheapi.service";
import {ProduitPage} from "../produit/produit";

/**
 * Generated class for the CategoriePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html',
})
export class CategoriePage {
  supermarche: SupermarchesModel = new SupermarchesModel();
  token: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public supermarcheApiService: SupermarcheapiService) {
    this.token = localStorage.getItem("token");
    this.getSupermarches(null);
  }

  public getSupermarches(refresher){
    this.supermarcheApiService.getSupermarches(this.token)
      .then(newsFetched => {
        this.supermarche = newsFetched;

        (refresher) ? refresher.complete() : null;
      });

  }
    PassProduit()
    {
      this.navCtrl.push(ProduitPage);
      localStorage.setItem('idSupermarche', this.supermarche.id);
      console.log(this.supermarche, this.supermarche.data.id);
    }
}
