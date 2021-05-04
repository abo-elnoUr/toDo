import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AddToDoRoutingModule } from './add-to-do-routing.module';
import { AddToDoComponent } from './add-to-do.component';


@NgModule({
  declarations: [
    AddToDoComponent
  ],
  imports: [
    CommonModule,
    AddToDoRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AddToDoModule { }
