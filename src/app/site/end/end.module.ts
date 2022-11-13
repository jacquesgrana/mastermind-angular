import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndComponent } from './end.component';
import { MaterialModule } from 'src/app/material-module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EndComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class EndModule { }
