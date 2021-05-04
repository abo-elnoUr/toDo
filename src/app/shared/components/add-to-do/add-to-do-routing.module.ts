import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/services/auth.guard';
import { AddToDoComponent } from './add-to-do.component';

const routes: Routes = [{ path: '', component: AddToDoComponent, canActivate : [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddToDoRoutingModule { }
