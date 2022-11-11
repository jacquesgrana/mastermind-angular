import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav.component';
import { MaterialModule } from 'src/app/material-module';



@NgModule({
  declarations: [
    HeaderNavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderNavComponent
  ]
})
export class HeaderNavModule { }
