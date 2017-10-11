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
export class mesCouponsapiService {

  private baseUrl: string = 'http://amhsoft.net/htitey/ListeCourse/web/app_dev.php/api/';

  constructor(private http: Http) { }

  public getMesCoupons( token:string): Promise<any> {
    const url = `${this.baseUrl}mesCoupons?_format=json&token=${token}`;
    console.log(url);
    return this.http.get(url).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
  public deleteCoupons( token:string, idCoupons): Promise<any> {
    const url = `${this.baseUrl}deletecoupons?_format=json&token=${token}&idCoupons=${idCoupons}`;
    console.log(url);
    return this.http.delete(url,null).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
}
