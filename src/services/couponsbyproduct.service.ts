// Core components
import { Injectable }   from '@angular/core';
import { Http }         from '@angular/http';

// RxJS
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ProduitModel} from "../models/produit.model";



// Models
// Importez vos models ici

@Injectable()
export class couponsbyproductService {

  private baseUrl: string = 'http://amhsoft.net/htitey/ListeCourse/web/app_dev.php/api/';

  constructor(private http: Http) { }

  public getCoupons( token:string, idProduit): Promise<any> {
    const url = `${this.baseUrl}CouponsByProduit?_format=json&token=${token}&idProduit=${idProduit}`;
    console.log(url);
    return this.http.get(url).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
  public setCoupons( token:string, idCoupons): Promise<any> {
    const url = `${this.baseUrl}addcoupons?_format=json&token=${token}&idCoupons=${idCoupons}`;
    console.log(url);
    return this.http.post(url,null).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
}
