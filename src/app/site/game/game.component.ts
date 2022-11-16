import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Library } from 'src/app/libraries/library';
import { Color } from 'src/app/model/color';
import { Combi } from 'src/app/model/combi';
import { GameTypeEnum } from 'src/app/model/enums/game-type-enum';
import { CombisService } from 'src/app/services/combis.service';
import { GameService } from 'src/app/services/game.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { environment } from 'src/environments/environment';
import { PauseComponent } from './pause/pause.component';
import { StatisticsComponent } from './statistics/statistics.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(
    public gameService: GameService,
    private statsService: StatisticsService,
    private combisService: CombisService,
    public dialogStats: MatDialog,
    public dialogPause: MatDialog,
    private router: Router
  ) {
    this.statsService.generateAllCombiList();
   }

  ngOnInit(): void {
    this.setGameType('EASY');
  }

  launchGame(): void {
    //const temp: GameTypeEnum = this.gameService.gameType;
    this.gameService.clearMatchValues();
    //this.gameService.gameType = temp;
    // TODO améliorer
    this.gameService.isGameLaunched = true;
    this.gameService.combiToFind = { colors: [] };
    this.gameService.generateCombiToFind();
    this.gameService.match.difficulty = this.gameService.gameType;
    this.gameService.match.isPlayerWin = false;

    if(this.gameService.gameType === GameTypeEnum.HARD) {
      this.gameService.setTimer();
    }
  }

  pauseGame(): void {
    this.gameService.pauseTimer();
    // selon le booleen this.gameService.gamePaused
    // true : ouvre la modal pause
    if(this.gameService.gamePaused) {
      console.log('ouverture modale pause');
      const dialogRefPause = this.dialogPause.open(PauseComponent, {
        disableClose: true,
        panelClass: ['dialog']
      });
    }
  }

  nextTurn(): void {
    this.gameService.combi.colors = Library.clone(this.gameService.combiToPlayList);
    this.gameService.turn.combi.colors = Library.clone(this.gameService.combi.colors);
    this.gameService.turn.combi = Library.clone(this.gameService.combi);
    this.gameService.turn.turnNumber = this.gameService.turnNumber;
    this.gameService.result = this.combisService.getResult(this.gameService.combiToFind, this.gameService.turn.combi);
    this.gameService.turn.result = Library.clone(this.gameService.result);
    this.gameService.match.turns.push(Library.clone(this.gameService.turn));

    if (this.gameService.turn.result.nbBlack === environment.COMBI_COLOR_NUMBER) {
      this.gameService.isGameWin = true;
    }

    if (this.gameService.turnNumber >= environment.MAX_TURN_NUMBER) {
      this.gameService.isGameLost = true;
    }

    if (this.gameService.gameType === GameTypeEnum.HARD && this.gameService.timeLeft === 0) {
      this.gameService.isGameLost = true;
    }

    if (this.gameService.isGameWin) {
      //alert('Partie gagnée !');
      this.gameService.isGameLost = false;
      this.gameService.match.isPlayerWin = true;
    }
    if (this.gameService.isGameLost) {
      //alert('Partie perdue !');
      this.gameService.match.isPlayerWin = false;
    }

    if (this.gameService.isGameWin || this.gameService.isGameLost) {
      if(this.gameService.gameType === GameTypeEnum.HARD) {
        this.gameService.stopTimer();
      }
      this.router.navigate(['end']);
    }
    this.gameService.updateIsCombiPlayable();
    let combi = new Combi(Library.clone(this.gameService.combiToPlayList));
    this.statsService.updateStatistics(combi,
      Library.clone(this.gameService.result),
      this.gameService.turnNumber);
    this.gameService.turnNumber++; // TODO attention !!!
  }

  setGameType(type: string): void {
    const buttonEasy = document.getElementById('button-easy');
    const buttonNormal = document.getElementById('button-normal');
    const buttonHard = document.getElementById('button-hard');
    switch (type) {
      case 'EASY':
        this.gameService.gameType = GameTypeEnum.EASY;
        buttonEasy?.classList.add('button-selected');
        buttonNormal?.classList.remove('button-selected');
        buttonHard?.classList.remove('button-selected');
        break;
      case 'NORMAL':
        this.gameService.gameType = GameTypeEnum.NORMAL;
        buttonEasy?.classList.remove('button-selected');
        buttonNormal?.classList.add('button-selected');
        buttonHard?.classList.remove('button-selected');
        break;
      case 'HARD':
        this.gameService.gameType = GameTypeEnum.HARD;
        buttonEasy?.classList.remove('button-selected');
        buttonNormal?.classList.remove('button-selected');
        buttonHard?.classList.add('button-selected');
        break;
    }
  }

  drop(event: CdkDragDrop<Color[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      if (event.container.id === 'block-combi-to-play') {
        if (this.gameService.combiToPlayList.length < environment.COMBI_COLOR_NUMBER) {
          this.transferDataArray(event);
        }
        else {
          //let colorToRemove = this.gameService.combiToPlayList.splice(event.currentIndex, 1)[0];
          //this.gameService.colorList.push(colorToRemove);
          //this.transferDataArray(event);
        }

      }
      else {
        this.transferDataArray(event);
      }
    }
    this.gameService.updateIsCombiPlayable();
  }

  transferDataArray(event: CdkDragDrop<Color[]>): void {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  openStats() {
    console.log('ouverture des stats');
    const dialogRefStats = this.dialogStats.open(StatisticsComponent, {
      disableClose: true,
      panelClass: ['dialog']
    });
  }
/*
  stopTimer() {
    //this.timerService.getObservable().unsubscribe();
  }*/
}
