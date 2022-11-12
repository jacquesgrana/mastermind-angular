import { environment } from "src/environments/environment";
import { Color } from "./color";

export class Combi {
  colors: Color[] = new Array<Color>(environment.COMBI_COLOR_NUMBER);

  constructor(colors: Color[]) {
    this.colors = colors;
  }
}
