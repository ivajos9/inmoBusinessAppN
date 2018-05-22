import {Component, ViewChild} from '@angular/core';
import {NavController, Slides} from 'ionic-angular';
import {FhaImmovable} from "../../app/core/bo/FhaInmovable";
import {Municipio} from "../../app/core/bo/Municipio";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  fhaInmos: FhaImmovable[];
  municipios: Municipio[];
  fhaDisp : FhaImmovable[] = [];

  defaultMun = 'GUATEMALA';
  seleccionado = 'GUATEMALA';

  constructor(public navCtrl: NavController,private firebaseService: FirebaseProvider) {
    this.firebaseService.getMunicipiosList().subscribe(municipios => {
      this.municipios = municipios;
    });
    this.firebaseService.getFhaList().subscribe(fhaInmos => {
      this.fhaInmos = fhaInmos;

      for (const disp of fhaInmos) {
        if (disp.available) {
          this.fhaDisp.push(disp);
        }
      }
      this.getForMunicipio();
    });
  }

  getForMunicipio() {
    console.log(this.seleccionado);
    this.firebaseService.getFhaList().subscribe(fhaInmos => {
        this.fhaInmos = fhaInmos;
        this.fhaDisp = [];

        if (this.seleccionado === '') {
          for (const disp of fhaInmos) {
            if (disp.available) {
              this.fhaDisp.push(disp);
            }
          }
        } else {
          for (const disp of fhaInmos) {
            if (disp.available && this.seleccionado === disp.city) {
              this.fhaDisp.push(disp);
            }
          }
        }
      }
    );
  }

  // goToDetail(codigo: string) {
  //   this._router.navigate(['/fha-detail', codigo]);
  // }

}
