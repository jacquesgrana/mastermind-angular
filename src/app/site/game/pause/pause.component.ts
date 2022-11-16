import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.scss']
})
export class PauseComponent implements OnInit {

  constructor(
    private gameService: GameService,
    public dialogRef: MatDialogRef<PauseComponent>
    ) { }

  ngOnInit(): void {
  }

  onClose():void {
    this.gameService.pauseTimer();
    this.dialogRef.close();
  }

}
