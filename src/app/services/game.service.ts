import { Injectable } from '@angular/core';
import { Color } from '../model/color';
import { ColorEnum } from '../model/enums/color-enum';
import { GameTypeEnum } from '../model/enums/game-type-enum';

const MAX_TURN_NUMBER: number = 12;
const COLOR_NUMBER: number = 8;
const COMBI_COLOR_NUMBER: number = 4;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public gameType: GameTypeEnum = GameTypeEnum.EASY;
  public isGameLaunched: boolean = false;

  public turnNumber: number = 0;

  public combiToPlayList: Color[] = [];

  public colorList: Color[] = [
    {
      colorType: ColorEnum.RED,
      colorName: 'Rouge',
      colorValueHex: '#DC143C',
      colorHTMLName: 'crimson',
      classColorBg: 'color-red',
      classColorTxt: 'text-color-red'

    },
    {
      colorType: ColorEnum.YELLOW,
      colorName: 'Jaune',
      colorValueHex: '#FFD700',
      colorHTMLName: 'gold',
      classColorBg: 'color-yellow',
      classColorTxt: 'text-color-yellow'
    },
    {
      colorType: ColorEnum.GREEN,
      colorName: 'Vert',
      colorValueHex: '#008000',
      colorHTMLName: 'green',
      classColorBg: 'color-green',
      classColorTxt: 'text-color-green'
    },
    {
      colorType: ColorEnum.BLUE,
      colorName: 'Bleu',
      colorValueHex: '#4169E1',
      colorHTMLName: 'royalblue',
      classColorBg: 'color-blue',
      classColorTxt: 'text-color-blue'
    },
    {
      colorType: ColorEnum.WHITE,
      colorName: 'Blanc',
      colorValueHex: '#F5F5F5',
      colorHTMLName: 'whitesmoke',
      classColorBg: 'color-white',
      classColorTxt: 'text-color-white'
    },
    {
      colorType: ColorEnum.ORANGE,
      colorName: 'Orange',
      colorValueHex: '#FF8C00',
      colorHTMLName: 'darkorange',
      classColorBg: 'color-orange',
      classColorTxt: 'text-color-orange'
    },
    {
      colorType: ColorEnum.VIOLET,
      colorName: 'Violet',
      colorValueHex: '#9932CC',
      colorHTMLName: 'darkorchid',
      classColorBg: 'color-violet',
      classColorTxt: 'text-color-violet'
    },
    {
      colorType: ColorEnum.FUCHSIA,
      colorName: 'Fuchsia',
      colorValueHex: '#FF00FF',
      colorHTMLName: 'fuchsia',
      classColorBg: 'color-fuchsia',
      classColorTxt: 'text-color-fuchsia'
    }
  ];

  constructor() { }

  getGameType(): string {
    let toReturn: string = '';
    switch(this.gameType) {
      case GameTypeEnum.EASY :
      toReturn = 'Facile';
      break;
      case GameTypeEnum.NORMAL :
      toReturn = 'Normal';
      break;
      case GameTypeEnum.HARD :
      toReturn = 'Difficile';
      break;
    }
    return toReturn;
  }

  getColorByName(colorName: string): Color {
    return this.colorList.filter(c => c.colorName.match(colorName) !== null)[0];
  }

  getColorByTypeEnum(colorEnumValue: ColorEnum): Color {
    return this.colorList.filter(c => JSON.stringify(c.colorType === JSON.stringify(colorEnumValue)))[0];
  }
}
