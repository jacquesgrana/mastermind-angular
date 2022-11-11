import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { MaterialModule } from 'src/app/material-module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class StartModule { }
