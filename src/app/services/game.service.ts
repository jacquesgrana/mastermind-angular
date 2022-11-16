import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
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
import { TimerService } from './timer.service';
/*
const MAX_TURN_NUMBER: number = 12;
const COLOR_NUMBER: number = 8;
const COMBI_COLOR_NUMBER: number = 4;
*/
@Injectable({
  providedIn: 'root'
})
export class GameService {

  //public notifier = new Subject();

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

  public timeLeft: number = 1000;
  public timeLeftSecond: number = 0;
  public timeLeftMinute: number = 0;

  public timerMinut: string = '';
  public timerSecond: string = '';

  public timePercent: number = 0;

  public subscription!: Subscription;
  public isTimerStopped: Subject<boolean> = new Subject();
  public isTimerPaused: Subject<boolean> = new Subject();

  public gamePaused: boolean = false;

  constructor(
    private colorsService : ColorsService,
    private timerService: TimerService,
    private router: Router
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

  clearMatchValues(): void {
    //const temp: GameTypeEnum = this.gameType;
    //this.gameType = GameTypeEnum.EASY;
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

    this.timeLeft = 0;
    this.timeLeftMinute = 0;
    this.timeLeftSecond = 0;
    if(this.subscription) {
      this.stopTimer();
    }
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

  updateTimer(value: number): void {
    // TODO mettre dans environment *******************************************************************
    const MATCH_TIME: number = 200;
    this.timeLeft = MATCH_TIME - value;
    this.timeLeftMinute = Math.floor(this.timeLeft/60);
    this.timeLeftSecond = this.timeLeft%60;
    //console.log('timer value :', value);
    console.log('timeLeft :', this.timeLeft);
    //console.log('timeLeftMinute :', this.timeLeftMinute);
    //console.log('timeLeftSecond :', this.timeLeftSecond);

    this.timerMinut = (this.timeLeftMinute < 10 ? '0' : '') + this.timeLeftMinute;
    this.timerSecond = (this.timeLeftSecond < 10 ? '0' : '') + this.timeLeftSecond;

    this.timePercent = 100 - Math.round(100 * this.timeLeft / MATCH_TIME);

    if(this.timeLeft === 0) {
      this.isGameLost = true;
      this.isGameWin = false;
      this.stopTimer();
      this.router.navigate(['end']);
    }
  }

  setTimer() {
    this.timerService.createTimer();
    this.subscription = this.timerService.getObservable()
      .pipe(takeUntil(this.isTimerStopped))
      .pipe(takeUntil(this.isTimerPaused))
      .subscribe(val => this.updateTimer(val));
  }

  pauseTimer() {
    this.gamePaused = !this.gamePaused;
    if(this.gamePaused) {
      this.isTimerPaused.next(true);
      //this.isTimerPaused.complete();
      this.subscription.unsubscribe();
      this.timerService.pause();
    }
    else {
      this.setTimer();
    }
  }

  stopTimer() {
    this.isTimerStopped.next(true);
    //this.isTimerStopped.complete();
    this.subscription.unsubscribe();
    this.timerService.resetObservable();
  }
}
