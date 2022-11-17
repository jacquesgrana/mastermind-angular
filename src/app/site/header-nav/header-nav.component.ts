import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsComponent } from 'src/app/site/shared/settings/settings.component'

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {

  @Input() title !: string;

  constructor(
    public dialogSettings: MatDialog
  ) {}

  openSettings(): void {
    const enterAnimationDuration = '1000ms';
    const exitAnimationDuration = '1000ms';
    const dialogRefSettings = this.dialogSettings.open(SettingsComponent, {
      disableClose: true,
      panelClass: ['dialog']
    });
  }

}
