import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AuthGuard } from './core/services/auth.guard';
import { RedirectGuard } from './core/services/redirect.guard';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch:'full'},
  {path: '',component: HomeComponent, canActivate : [AuthGuard]},
  { path: 'add-to-do', loadChildren: () => import('./shared/components/add-to-do/add-to-do.module').then(m => m.AddToDoModule) },
  {path: 'edit/:id', loadChildren: () => import('./shared/components/mange-to-do/mange-to-do.module').then(m => m.MangeToDoModule) },
  {path: 'login', component: LoginComponent, canActivate : [RedirectGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
