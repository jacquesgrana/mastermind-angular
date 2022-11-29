import { Component, OnInit } from '@angular/core';
import { GameTypeEnum } from 'src/app/model/enums/game-type-enum';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  timeComment: string = '';

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameService.isGameLaunched = false;
    if(this.gameService.gameType === GameTypeEnum.HARD) {
      this.timeComment = this.generateTimeComment();
    }
  }

  clearMatchValues(): void {
    this.gameService.clearMatchValues();
  }

  generateTimeComment(): string {
    let textToReturn = '';
    if(this.gameService.isGameWin) {
      if (this.gameService.timeLeftMinute > 0) {
        textToReturn = 'Temps restant : ' + this.gameService.timeLeftMinute + ' min. ' + this.gameService.timeLeftSecond + ' sec.';
      }
      else {
        textToReturn = 'Temps restant : ' + this.gameService.timeLeftSecond + ' sec.';
      }
    }
    else {
      textToReturn = 'Temps dépassé !';
    }
    return textToReturn;
  }
}
