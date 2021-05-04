import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/services/auth.guard';
import { MangeToDoComponent } from './mange-to-do.component';

const routes: Routes = [{ path: '',component: MangeToDoComponent, canActivate : [AuthGuard] }]

@NgModule({
  imports : [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class MangeToDoRoutingModule { }
