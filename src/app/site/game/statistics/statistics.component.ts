import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(
    public statsService: StatisticsService,
    public dialogRef: MatDialogRef<StatisticsComponent>,
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
