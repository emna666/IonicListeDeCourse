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
export class ProduitapiService {

  private baseUrl: string = 'http://amhsoft.net/htitey/ListeCourse/web/app_dev.php/api/';

  constructor(private http: Http) { }

  public getProduits( token:string, idSupermarche): Promise<any> {
    const url = `${this.baseUrl}produitsBySupermarche?_format=json&token=${token}&idSupermarche=${idSupermarche}`;
    console.log(url);
    return this.http.get(url).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
  public setProduit( token:string, idProduit): Promise<any> {
    const url = `${this.baseUrl}addproduit?_format=json&token=${token}&idProduit=${idProduit}`;
    console.log(url);
    return this.http.post(url,null).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }

}
