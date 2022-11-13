import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Color } from '../model/color';
import { Combi } from '../model/combi';
import { ColorEnum } from '../model/enums/color-enum';
import { GameTypeEnum } from '../model/enums/game-type-enum';
import { Match } from '../model/match';
import { Result } from '../model/result';
import { Turn } from '../model/turn';
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


  public colorListAll: Color[] = [
    {
      colorId: 0,
      colorType: ColorEnum.RED,
      colorName: 'Rouge',
      colorValueHex: '#DC143C',
      colorHTMLName: 'crimson',
      classColorBg: 'color-red',
      classColorTxt: 'text-color-red'

    },
    {
      colorId: 1,
      colorType: ColorEnum.YELLOW,
      colorName: 'Jaune',
      colorValueHex: '#FFD700',
      colorHTMLName: 'gold',
      classColorBg: 'color-yellow',
      classColorTxt: 'text-color-yellow'
    },
    {
      colorId: 2,
      colorType: ColorEnum.GREEN,
      colorName: 'Vert',
      colorValueHex: '#008000',
      colorHTMLName: 'green',
      classColorBg: 'color-green',
      classColorTxt: 'text-color-green'
    },
    {
      colorId: 3,
      colorType: ColorEnum.BLUE,
      colorName: 'Bleu',
      colorValueHex: '#4169E1',
      colorHTMLName: 'royalblue',
      classColorBg: 'color-blue',
      classColorTxt: 'text-color-blue'
    },
    {
      colorId: 4,
      colorType: ColorEnum.WHITE,
      colorName: 'Blanc',
      colorValueHex: '#F5F5F5',
      colorHTMLName: 'whitesmoke',
      classColorBg: 'color-white',
      classColorTxt: 'text-color-white'
    },
    {
      colorId: 5,
      colorType: ColorEnum.ORANGE,
      colorName: 'Orange',
      colorValueHex: '#FF8C00',
      colorHTMLName: 'darkorange',
      classColorBg: 'color-orange',
      classColorTxt: 'text-color-orange'
    },
    {
      colorId: 6,
      colorType: ColorEnum.VIOLET,
      colorName: 'Violet',
      colorValueHex: '#9932CC',
      colorHTMLName: 'darkorchid',
      classColorBg: 'color-violet',
      classColorTxt: 'text-color-violet'
    },
    {
      colorId: 7,
      colorType: ColorEnum.FUCHSIA,
      colorName: 'Fuchsia',
      colorValueHex: '#FF00FF',
      colorHTMLName: 'fuchsia',
      classColorBg: 'color-fuchsia',
      classColorTxt: 'text-color-fuchsia'
    }
  ];

  public colorList: Color[] = this.clone(this.colorListAll);

  constructor() { }

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

  clone(toClone: any): any {
    return JSON.parse(JSON.stringify(toClone));
  }

  getColorByName(colorName: string): Color {
    return this.colorListAll.filter(c => c.colorName.match(colorName) !== null)[0];
  }

  getColorByTypeEnum(colorEnumValue: ColorEnum): Color {
    return this.colorListAll.filter(c => JSON.stringify(c.colorType === JSON.stringify(colorEnumValue)))[0];
  }

  getColorById(id: number): Color {
    return this.colorListAll.filter(c => c.colorId === id)[0];
  }

  generateCombiToFind(): void {
    for (let i = 0; i < environment.COMBI_COLOR_NUMBER; i++) {
      let colorToAdd: Color;
      let randomNumber: number;
      do {
        randomNumber = Math.floor(Math.random() * (environment.COLOR_NUMBER));
        //console.log('random number :', randomNumber);
        colorToAdd = this.getColorById(randomNumber);
      }
      while (this.combiToFind.colors.includes(colorToAdd));
      this.combiToFind.colors[i] = colorToAdd;
    }
    console.log('combi to find :', this.combiToFind);
  }

  getResult(combiToFind: Combi, combiToTest: Combi): Result {
    let nbWhite = this.getWhiteNumber(combiToFind, combiToTest);
    let nbBlack = this.getBlackNumber(combiToFind, combiToTest);
    console.log('result : nbwhite : ' + nbWhite + ' : nbBlack : ' + nbBlack);
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

    this.colorList = this.colorListAll;

    this.isCombiPlayable = false;
  }
}
