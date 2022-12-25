import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { SettingsComponent } from 'src/app/site/shared/settings/settings.component'

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {

  @Input() title !: string;

  public currentRoute: String = '';

  constructor(
    public dialogSettings: MatDialog,
    public gameService: GameService,
    public router: Router
  ) {}

  openSettings(): void {
    const enterAnimationDuration = '1000ms';
    const exitAnimationDuration = '1000ms';
    const dialogRefSettings = this.dialogSettings.open(SettingsComponent, {
      disableClose: true,
      panelClass: ['dialog']
    });
  }

  openGame() {
    this.gameService.clearMatchValues();
    this.router.navigate(['game']);
  }

  openRules() {
    this.gameService.clearMatchValues();
    this.router.navigate(['start']);
  }

  goToRoot() {
    window.location.href = '../index.html';
 }

}
