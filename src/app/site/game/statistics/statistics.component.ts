import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ColorsService } from 'src/app/services/colors.service';
import { GameService } from 'src/app/services/game.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  limitMatchingCombis = environment.LIMIT_MATCHING_COMBIS;
  isMatchingCombiShow: boolean = false;
  combiColorNumber: number = environment.COMBI_COLOR_NUMBER

  constructor(
    public statsService: StatisticsService,
    public colorService: ColorsService,
    public gameService: GameService,
    public dialogRef: MatDialogRef<StatisticsComponent>,
  ) { }

  ngOnInit(): void {
  }

}
