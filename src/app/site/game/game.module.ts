import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { MaterialModule } from 'src/app/material-module';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StatisticsComponent } from './statistics/statistics.component';
import { PauseComponent } from './pause/pause.component';


@NgModule({
  declarations: [
    GameComponent,
    StatisticsComponent,
    PauseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    MaterialModule
  ]
})
export class GameModule { }
