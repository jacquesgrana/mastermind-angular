import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { MaterialModule } from 'src/app/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
