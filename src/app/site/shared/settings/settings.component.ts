import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public dialogRef: MatDialogRef<SettingsComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.maxMatchTime = this.gameService.maxMatchTime;
  }

  validateChoices() {
    this.gameService.maxMatchTime = this.maxMatchTime;
    // TODO ajouter affichage
    //this.dialogRef.close();
    this.openSnackBar('Nouveau réglage pris en compte.', 'Fermer', 2000);
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(
      message,
      action,
      {
        duration: duration,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar']
      }

    );
  }

}
