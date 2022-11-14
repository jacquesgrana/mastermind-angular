import { ColorEnum } from "./enums/color-enum";

export class Color {

  public colorId: number;
  public colorType: ColorEnum;
  public colorName: string;
  public colorValueHex: string;
  public colorHTMLName: string;
  public classColorBg: string;
  public classColorTxt: string;

  constructor(
    colorId: number,
    colorType: ColorEnum,
    colorName: string,
    colorValueHex: string,
    colorHTMLName: string,
    classColorBg: string,
    classColorTxt: string
  ) {
    this.colorId = colorId;
    this.colorType = colorType;
    this.colorName = colorName;
    this.colorValueHex = colorValueHex;
    this.colorHTMLName = colorHTMLName;
    this.classColorBg = classColorBg;
    this.classColorTxt = classColorTxt;
  }
}
