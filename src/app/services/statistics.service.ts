import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Combi } from '../model/combi';
import { Result } from '../model/result';
import { ColorsService } from './colors.service';
import { CombisService } from './combis.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  allCombiList: Combi[] = [];
  combiPlayedList: Combi[] = [];
  matchedCombiList: Combi[] = [];
  matchedCombiCumulList: Combi[] = [];


  constructor(
    private colorsService: ColorsService,
    private combisService: CombisService
  ) { }

  generateAllCombiList(): void {
    for (let i = 0; i < environment.COLOR_NUMBER; i++) {
      for (let j = 0; j < environment.COLOR_NUMBER; j++) {
        for (let k = 0; k < environment.COLOR_NUMBER; k++) {
          for (let l = 0; l < environment.COLOR_NUMBER; l++) {
            if ((i != j)
              && (i != k)
              && (i != l)
              && (j != k)
              && (j != l)
              && (k != l)) {
              let combi = new Combi([]);
              combi.colors[0] = this.colorsService.getColorById(i);
              combi.colors[1] = this.colorsService.getColorById(j);
              combi.colors[2] = this.colorsService.getColorById(k);
              combi.colors[3] = this.colorsService.getColorById(l);
              this.allCombiList.push(combi);
            }
          }
        }
      }
    }
    //console.log('nb combis générées :', this.allCombiList.length);
  }


  updateStatistics(combiToAdd: Combi, result: Result, turnNumber: number): void {
    console.log('service stats : update des stats');
    this.combiPlayedList.push(combiToAdd);
    // calculer les combi qui matchent avec le resultat
    // calculer les combis qui matchent cumulées
  }

}
