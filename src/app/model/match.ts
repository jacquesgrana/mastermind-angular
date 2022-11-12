import { environment } from "src/environments/environment";
import { GameTypeEnum } from "./enums/game-type-enum";
import { Turn } from "./turn";

export class Match {

  isPlayerWin: boolean;
  difficulty: GameTypeEnum;
  turns: Turn[] = new Array<Turn>(environment.MAX_TURN_NUMBER);

  constructor(isPlayerWin: boolean, difficulty: GameTypeEnum, turns: Turn[]) {
    this.isPlayerWin = isPlayerWin;
    this.difficulty = difficulty;
    this.turns = turns;
  }
}
