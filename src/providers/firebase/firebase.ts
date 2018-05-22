import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {FhaImmovable} from "../../app/core/bo/FhaInmovable";
import {Municipio} from "../../app/core/bo/Municipio";

@Injectable()
export class FirebaseProvider {

  public fhaInmo: Observable<FhaImmovable[]>;
  public municipios: Observable<Municipio[]>;
  public detailInmo: Observable<any>;

  constructor(private afDb: AngularFireDatabase) {
  }

  getListByPath(listPath): Observable<any[]> {
    return this.afDb.list(listPath).valueChanges();
  }

  getFhaList() {
    this.fhaInmo = this.getListByPath('/fha/immovables');
    return this.fhaInmo;
  }

  getMunicipiosList() {
    this.municipios = this.getListByPath('/fha/locations-fha');
    return this.municipios;
  }

  getImmovableDetail(codigo) {
    this.detailInmo = this.afDb.object('/fha/immovables/' + codigo).valueChanges();
    return this.detailInmo;

  }
}
