import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Library } from '../libraries/library';
import { Color } from '../model/color';
import { Combi } from '../model/combi';
import { ColorEnum } from '../model/enums/color-enum';
import { GameTypeEnum } from '../model/enums/game-type-enum';
import { Match } from '../model/match';
import { Result } from '../model/result';
import { Turn } from '../model/turn';
import { ColorsService } from './colors.service';
/*
const MAX_TURN_NUMBER: number = 12;
const COLOR_NUMBER: number = 8;
const COMBI_COLOR_NUMBER: number = 4;
*/
@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameType: GameTypeEnum = GameTypeEnum.EASY;
  public isGameLaunched: boolean = false;

  public turnNumber: number = 1;
  public match: Match = { isPlayerWin: false, difficulty: GameTypeEnum.EASY, turns: [] };
  public turn: Turn = { turnNumber: 1, combi: { colors: [] }, result: { nbWhite: 0, nbBlack: 0 } };
  public result: Result = { nbWhite: 0, nbBlack: 0 };
  public combi: Combi = { colors: [] };

  public combiToFind: Combi = { colors: [] };
  public combiToPlayList: Color[] = [];

  public isGameWin: boolean = false;
  public isGameLost: boolean = false;

  public isCombiPlayable: boolean = false;
  public colorList: Color[] = Library.clone(this.colorsService.colorListAll);

  constructor(
    private colorsService : ColorsService
  ) { }

  getGameType(): string {
    let toReturn: string = '';
    switch (this.gameType) {
      case GameTypeEnum.EASY:
        toReturn = 'Facile';
        break;
      case GameTypeEnum.NORMAL:
        toReturn = 'Normal';
        break;
      case GameTypeEnum.HARD:
        toReturn = 'Difficile';
        break;
    }
    return toReturn;
  }



  generateCombiToFind(): void {
    for (let i = 0; i < environment.COMBI_COLOR_NUMBER; i++) {
      let colorToAdd: Color;
      let randomNumber: number;
      do {
        randomNumber = Math.floor(Math.random() * (environment.COLOR_NUMBER));
        //console.log('random number :', randomNumber);
        colorToAdd = this.colorsService.getColorById(randomNumber);
      }
      while (this.combiToFind.colors.includes(colorToAdd));
      this.combiToFind.colors[i] = colorToAdd;
    }
    console.log('combi to find :', this.combiToFind);
  }
/*
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
  */

  clearMatchValues(): void {
    this.gameType = GameTypeEnum.EASY;
    this.isGameLaunched = false;
    this.turnNumber = 1;
    this.match = { isPlayerWin: false, difficulty: GameTypeEnum.EASY, turns: [] };
    this.turn = { turnNumber: 1, combi: { colors: [] }, result: { nbWhite: 0, nbBlack: 0 } };
    this.result = { nbWhite: 0, nbBlack: 0 };
    this.combi = { colors: [] };
    this.combiToFind = { colors: [] };
    this.combiToPlayList = [];
    this.isGameWin = false;
    this.isGameLost = false;
    this.colorList = Library.clone(this.colorsService.colorListAll);
    this.isCombiPlayable = false;
  }

  updateIsCombiPlayable(): void {
    let toReturn = this.combiToPlayList.length == environment.COMBI_COLOR_NUMBER;
    if (this.match.turns.length > 0) {
      for (let t of this.match.turns) {
        if (JSON.stringify(t.combi.colors) === JSON.stringify(this.combiToPlayList)) {
          toReturn = toReturn && false;
        }
        else {
          toReturn = toReturn && true;
        }
      }
    }
    this.isCombiPlayable = toReturn;
  }
}
