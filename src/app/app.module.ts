import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TodoService } from './core/services/todo.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AddToDoComponent } from './shared/components/add-to-do/add-to-do.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/pipes/search.pipe';
import { MangeToDoComponent } from './shared/components/mange-to-do/mange-to-do.component';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AddToDoComponent,
    FilterPipe,
    MangeToDoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
