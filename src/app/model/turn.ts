import { Combi } from "./combi";
import { Result } from "./result";

export class Turn {

  // TODO ajouter ellapsedTime en ms

  turnNumber : number;
  combi: Combi;
  result: Result

  constructor(turnNumber : number, combi: Combi, result: Result) {
    this.turnNumber = turnNumber;
    this.combi = combi;
    this.result = result;
  }
}
