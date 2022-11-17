import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav.component';
import { MaterialModule } from 'src/app/material-module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    HeaderNavComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderNavComponent
  ]
})
export class HeaderNavModule { }
