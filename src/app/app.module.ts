import { TodoTaskService } from './shared/services/todo-task.service';
import { DataStorageService } from './shared/services/data-storage/data-storage.service';
import { CheckedBackgroundDirective } from './shared/directives/checked-background/checked-background.directive';
import { TodoCardsService } from './shared/services/todo-cards.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { MainCardComponent } from './main-card/main-card.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodoTaskComponent } from './todo-task/todo-task.component';

// Directives
import { ClickOutsideDirective } from './../../node_modules/angular2-click-outside/clickOutside.directive';

// Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FocusDirective } from './shared/directives/focus-input/focus.directive';



@NgModule({
  declarations: [
    AppComponent,
    MainCardComponent,
    TodoCardComponent,
    TodoTaskComponent,
    FocusDirective,

    // directives
    CheckedBackgroundDirective,
    ClickOutsideDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,

    BrowserAnimationsModule
  ],
  // Making one instance of the service for the whole application
  providers: [TodoCardsService, DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
