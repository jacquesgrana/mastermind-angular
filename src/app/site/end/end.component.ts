import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  clearMatchValues(): void {
    this.gameService.clearMatchValues();
  }

}
