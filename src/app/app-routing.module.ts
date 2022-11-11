import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './site/game/game.component';
import { StartComponent } from './site/start/start.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'\start',
    pathMatch:"full"
  },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: '**',
    component: StartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
