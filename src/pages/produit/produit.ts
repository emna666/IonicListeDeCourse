import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {ProduitapiService} from "../../services/produitapi.service";
import {ProduitModel} from "../../models/produit.model";
import {CouponsproduitPage} from "../couponsproduit/couponsproduit";



@Component({
  selector: 'page-produit',
  templateUrl: 'produit.html',
})
export class ProduitPage {
  produite : any;
  supName: any;
  idSupermarche: string;
  token: string;
  private loader;
  searchQuery: string = '';

  constructor(public navCtrl: NavController,private viewCtrl: ViewController, public loadingCtrl: LoadingController, private produitApiService: ProduitapiService,public alertCtrl: AlertController) {
    this.token = localStorage.getItem("token");
    this.idSupermarche =  localStorage.getItem("idSupermarche");
    this.getProduits();
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

  public getProduits(){
    this.loading();
    this.produitApiService.getProduits(this.token,this.idSupermarche).then(data => {
      this.loader.dismiss();
      console.log(data.data);
      this.supName = data.data.libelle;
     this.produite = data.data.produits;

    })
      .catch(error => {
        console.log(error);

      });
  }
  getItems(ev: any) {

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.produite = this.produite.filter((produit) => {
        return (produit.libelle.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  PassCoupons(id_prod)
  {
    this.navCtrl.push(CouponsproduitPage);
    localStorage.setItem('idProduit', id_prod);
  }
  addProduit(id_prod)
{
  this.produitApiService.setProduit(this.token,id_prod).then(
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
