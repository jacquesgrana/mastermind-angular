import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/model/color';
import { GameTypeEnum } from 'src/app/model/enums/game-type-enum';
import { GameService } from 'src/app/services/game.service';

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
    this.setGameType('EASY');
  }

  launchGame(): void {
    //this.gameService.isGameLaunched = true;
    this.gameService.isGameLaunched = !this.gameService.isGameLaunched; // TODO enlever qd ok
    //this.gameService.turnNumber++;
  }

  setGameType(type: string): void {
    const buttonEasy = document.getElementById('button-easy');
    const buttonNormal = document.getElementById('button-normal');
    const buttonHard = document.getElementById('button-hard');
    switch(type) {
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
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
