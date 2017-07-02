import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { MainCardComponent } from './main-card/main-card.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';



@NgModule({
  declarations: [
    AppComponent,
    MainCardComponent,
    TodoCardComponent,
    TodoTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
