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
  matchingCombiList: Combi[] = [];
  matchingCombiCumulList: Combi[] = [];

  matchingCombiNb: number = 0;
  matchingCombiCumulNb: number = 0;


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
    this.calculateMatchingCombis(combiToAdd, this.allCombiList, result);
    console.log('nombre de combis qui matchent :', this.matchingCombiList.length);
    this.matchingCombiNb = this.matchingCombiList.length;
    // calculer les combis qui matchent cumulées
    if(turnNumber > 1) {
      this.calculateMatchingCombisCumul(combiToAdd, this.matchingCombiCumulList, result);
    }
    else {
      this.matchingCombiCumulList = this.matchingCombiList;
    }

    console.log('nombre de combis cumulées qui matchent :', this.matchingCombiCumulList.length);
    this.matchingCombiCumulNb = this.matchingCombiCumulList.length;
  }

  calculateMatchingCombis(combiToAdd: Combi, combiList: Combi[], result: Result): void {
    this.matchingCombiList = [];
    combiList.forEach(c => {
      if(JSON.stringify(this.combisService.getResult(c, combiToAdd)) === JSON.stringify(result)) {
        this.matchingCombiList.push(c);
      }
    });

  }

  calculateMatchingCombisCumul(combiToAdd: Combi, combiList: Combi[], result: Result): void {
    let combiCumulList : Combi[] = [];
    combiList.forEach(c => {
      if(JSON.stringify(this.combisService.getResult(c, combiToAdd)) === JSON.stringify(result)) {
        combiCumulList.push(c);
      }
    });
    this.matchingCombiCumulList = combiCumulList;
  }
}
