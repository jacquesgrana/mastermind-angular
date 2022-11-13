import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndComponent } from './site/end/end.component';
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
    path: 'end',
    component: EndComponent
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
