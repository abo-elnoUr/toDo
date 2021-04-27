import { MangeToDoComponent } from './shared/components/mange-to-do/mange-to-do.component';
import { AddToDoComponent } from './shared/components/add-to-do/add-to-do.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch:'full'},
  {path: '',component: HomeComponent},
  {path: 'add-to-do',component: AddToDoComponent},
  {path: 'edit/:id', component: MangeToDoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
