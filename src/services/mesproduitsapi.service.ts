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
export class mesProduitsapiService {

  private baseUrl: string = 'http://amhsoft.net/htitey/ListeCourse/web/app_dev.php/api/';

  constructor(private http: Http) { }

  public getMesProduits( token:string): Promise<any> {
    const url = `${this.baseUrl}mesProduits?_format=json&token=${token}`;
    console.log(url);
    return this.http.get(url).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
  public deleteProduit( token:string, idProduit): Promise<any> {
    const url = `${this.baseUrl}deleteproduit?_format=json&token=${token}&idProduit=${idProduit}`;
    console.log(url);
    return this.http.delete(url,null).toPromise().then(
      reponse => reponse.json()
    ).catch(error => console.log('une erreur est survenue'+ error))

  }
}
