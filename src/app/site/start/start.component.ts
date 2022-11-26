import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  combiColorNumber: number = environment.COMBI_COLOR_NUMBER;
  colorNumber: number = environment.COLOR_NUMBER;
  maxTurnNumber: number = environment.MAX_TURN_NUMBER;
  limitMatchingCombis: number = environment.LIMIT_MATCHING_COMBIS;

  constructor(
    public gameService: GameService
  ) { }

  ngOnInit(): void {

  }

}
