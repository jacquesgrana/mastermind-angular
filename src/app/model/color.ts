import { ColorEnum } from "./enums/color-enum";

export class Color {

  colorType : ColorEnum;
  colorName : string;
  colorValueHex : string;
  colorHTMLName: string;
  classColorBg: string;
  classColorTxt: string;

  constructor(
    colorType: ColorEnum,
    colorName: string,
    colorValueHex: string,
    colorHTMLName: string,
    classColorBg: string,
  classColorTxt: string
    ) {
    this.colorType = colorType;
    this.colorName = colorName;
    this.colorValueHex = colorValueHex;
    this.colorHTMLName = colorHTMLName;
    this.classColorBg = classColorBg;
    this.classColorTxt = classColorTxt;
  }
}
