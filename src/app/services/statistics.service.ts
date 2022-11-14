import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Library } from '../libraries/library';
import { Color } from '../model/color';
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

  presenceProbaMap!: Map<Color, number>;

  predictedCombi: Combi = {colors:[]};
  isPredictedCombiEmpty: boolean = true;

  constructor(
    private colorsService: ColorsService,
    private combisService: CombisService
  ) {
    this.presenceProbaMap = new Map([]);
    this.predictedCombi.colors.push();
    this.predictedCombi.colors.push();
    this.predictedCombi.colors.push();
    this.predictedCombi.colors.push();
   }

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
    this.combiPlayedList.push(combiToAdd);

    this.calculateMatchingCombis(combiToAdd, this.allCombiList, result);
    this.matchingCombiNb = this.matchingCombiList.length;
    if(turnNumber > 1) {
      this.calculateMatchingCombisCumul(combiToAdd, this.matchingCombiCumulList, result);
    }
    else {
      this.matchingCombiCumulList = this.matchingCombiList;
    }
    this.matchingCombiCumulNb = this.matchingCombiCumulList.length;

    this.calculatePresenceProba(this.matchingCombiCumulList, this.colorsService.colorListAll);
    this.calculatePredictedCombi(this.matchingCombiCumulList, this.colorsService.colorListAll);
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

  calculatePresenceProba(combiList: Combi[], colorList: Color[]): void {
    // boucle sur les 8 couleurs : color : colorList
      // compteur = 0
      // boucle sur combiList : combi
        // si combi contient color compteur++

      // proba = (compteur / combiList.length) * 100
      // presenceProbaMap.push(color, proba)
    this.presenceProbaMap = new Map([]);
    colorList.forEach(color => {
      let counter = 0
      combiList.forEach(combi => {
        if(combi.colors.includes(color)) {
          counter++;
        }
      });
      let proba: number = Math.round(100 * counter / combiList.length);
      this.presenceProbaMap.set(Library.clone(color), proba);
      //console.log(color.colorName + ' : proba : ' + proba);

    });
  }

  calculatePredictedCombi(combiList: Combi[], colorList: Color[]): void {
    // boucle sur i de 0 a 3 : les 4 element de predicted
      // isPresent = true;
      // boucle sur les 8 couleurs : color : colorList
        // boucle sur combiList : combi
          // si combi.color[i] === color
            // isPresent = isPresent && true
          // else
            // isPresent = isPresent && true
        // si isPresent == true --> predictedCombi[i] = clone(color)

    for(let i=0; i<environment.COMBI_COLOR_NUMBER; i++) {

      colorList.forEach(color => {
        let isAllwaysPresent: boolean = true;
        combiList.forEach(combi => {
          if(JSON.stringify(combi.colors[i]) === JSON.stringify(color)) { //this.colorsService.compareColors(combi.colors[i], color)
            isAllwaysPresent = isAllwaysPresent && true;
          }
          else {
            isAllwaysPresent = isAllwaysPresent && false;
          }
        });
        if(isAllwaysPresent) {
          this.isPredictedCombiEmpty = false;
          this.predictedCombi.colors[i] = Library.clone(color);
        }
      });
    }
    console.log('predicted combi colors : ', this.predictedCombi.colors);

  }
}
