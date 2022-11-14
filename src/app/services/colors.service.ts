import { Injectable } from '@angular/core';
import { Color } from '../model/color';
import { ColorEnum } from '../model/enums/color-enum';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

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

  constructor() { }


  getColorByName(colorName: string): Color {
    return this.colorListAll.filter(c => c.colorName.match(colorName) !== null)[0];
  }

  getColorByTypeEnum(colorEnumValue: ColorEnum): Color {
    return this.colorListAll.filter(c => JSON.stringify(c.colorType === JSON.stringify(colorEnumValue)))[0];
  }

  getColorById(id: number): Color {
    return this.colorListAll.filter(c => c.colorId === id)[0];
  }

  compareColors(color1: Color, color2: Color): boolean {
    let toReturn: boolean = color1.colorId === color2.colorId;
    toReturn = toReturn && color1.colorType === color2.colorType;
    toReturn = toReturn && color1.colorName === color2.colorName;
    toReturn = toReturn && color1.colorValueHex === color2.colorValueHex;
    toReturn = toReturn && color1.colorHTMLName === color2.colorHTMLName;
    toReturn = toReturn && color1.classColorBg === color2.classColorBg;
    toReturn = toReturn && color1.classColorTxt === color2.classColorTxt;
    return toReturn;
  }

}
