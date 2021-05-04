import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MangeToDoComponent } from './mange-to-do.component';
import { MangeToDoRoutingModule } from './mange-to-do-routing.module';

@NgModule({
  declarations : [
    MangeToDoComponent
  ],
  imports : [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MangeToDoRoutingModule
  ]
})


export class MangeToDoModule{}
