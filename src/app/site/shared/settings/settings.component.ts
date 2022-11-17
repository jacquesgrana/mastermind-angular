import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public maxMatchTime: number = 0;

  constructor(
    private gameService: GameService,
    public dialogRef: MatDialogRef<SettingsComponent>
  ) { }

  ngOnInit(): void {
    this.maxMatchTime = this.gameService.maxMatchTime;
  }

  validateChoices() {
    console.log('validate form');

    this.gameService.maxMatchTime = this.maxMatchTime;
    //this.dialogRef.close();
  }

}
