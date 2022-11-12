import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/model/color';
import { Combi } from 'src/app/model/combi';
import { GameTypeEnum } from 'src/app/model/enums/game-type-enum';
import { Match } from 'src/app/model/match';
import { Turn } from 'src/app/model/turn';
import { GameService } from 'src/app/services/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {




  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
    //this.setGameType('EASY');
  }

  launchGame(): void {
    //this.gameService.isGameLaunched = true;
    this.gameService.isGameLaunched = true; // TODO enlever qd ok
    this.gameService.combiToFind = {colors: []};
    this.gameService.generateCombiToFind();
  }

  nextTurn(): void {

    this.gameService.combi.colors = this.gameService.combiToPlayList;
    this.gameService.turn.combi = this.gameService.combi;
    this.gameService.turn.turnNumber = this.gameService.turnNumber;

    this.gameService.turnNumber++;
    if (this.gameService.turnNumber > environment.MAX_TURN_NUMBER) {
      this.gameService.isGameLost = true;
    }

    if (this.gameService.isGameWin) {
      alert('Partie gagnée !');
    }
    if (this.gameService.isGameLost) {
      alert('Partie perdue !');
    }
  }

  setGameType(type: string): void {
    //console.log('appel setGameType :', type);

    const buttonEasy = document.getElementById('button-easy');
    const buttonNormal = document.getElementById('button-normal');
    const buttonHard = document.getElementById('button-hard');

    //console.log('easy button :', buttonEasy);
    //console.log('normal button :', buttonNormal);
    //console.log('hard button :', buttonHard);

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
          //let colorToRemove = this.gameService.combiToPlayList[event.currentIndex];
          let colorToRemove = this.gameService.combiToPlayList.splice(event.currentIndex, 1)[0];
          this.gameService.colorList.push(colorToRemove);
          this.transferDataArray(event);
        }

      }
      else {
        this.transferDataArray(event);
      }
    }
    this.gameService.isCombiPlayable = this.gameService.combiToPlayList.length == environment.COMBI_COLOR_NUMBER;
  }

  transferDataArray(event: CdkDragDrop<Color[]>): void {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
