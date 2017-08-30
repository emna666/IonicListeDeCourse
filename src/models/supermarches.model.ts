import {LocaliteModel} from "./localite.model";

export class  SupermarchesModel {
  id: string;
  libelle: string;
  longitude: number;
  latitude:number;
  adresse: string;
  email: string;
  photo: string;
  localite: LocaliteModel[];
}
