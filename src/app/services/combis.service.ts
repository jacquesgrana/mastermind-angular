import { Injectable } from '@angular/core';
import { Combi } from '../model/combi';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class CombisService {

  constructor() { }

  getResult(combiToFind: Combi, combiToTest: Combi): Result {
    let nbWhite = this.getWhiteNumber(combiToFind, combiToTest);
    let nbBlack = this.getBlackNumber(combiToFind, combiToTest);
    return { nbWhite: nbWhite, nbBlack: nbBlack };
  }

  getWhiteNumber(combiToFind: Combi, combiToTest: Combi): number {
    let toReturn: number = 0;
    let i: number = 0;
    let j: number = 0;
    combiToTest.colors.forEach(ctt => {
      j = 0;
      combiToFind.colors.forEach(
        ctf => {
          if (JSON.stringify(ctf) === JSON.stringify(ctt) && j !== i) {
            toReturn++;
          }
          j++
        }
      );
      i++;
    });
    return toReturn;
  }

  getBlackNumber(combiToFind: Combi, combiToTest: Combi): number {
    let toReturn: number = 0;
    let i: number = 0;
    let j: number = 0;
    combiToTest.colors.forEach(ctt => {
      j = 0;
      combiToFind.colors.forEach(
        ctf => {
          if (JSON.stringify(ctf) === JSON.stringify(ctt) && j === i) {
            toReturn++;
          }
          j++
        }
      );
      i++;
    });
    return toReturn;
  }
}
