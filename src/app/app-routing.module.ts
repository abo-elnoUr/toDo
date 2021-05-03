import { RedirectGuard } from './core/services/redirect.guard';
import { AuthGuard } from './core/services/auth.guard';
import { MangeToDoComponent } from './shared/components/mange-to-do/mange-to-do.component';
import { AddToDoComponent } from './shared/components/add-to-do/add-to-do.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch:'full'},
  {path: '',component: HomeComponent, canActivate : [AuthGuard]},
  {path: 'add-to-do',component: AddToDoComponent, canActivate : [AuthGuard]},
  {path: 'edit/:id', component: MangeToDoComponent, canActivate : [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate : [RedirectGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
