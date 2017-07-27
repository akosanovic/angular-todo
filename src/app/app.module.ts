import { TodoTaskComponent } from './todo-card/todo-task/todo-task.component';
import { CursorPointerDirective } from './shared/directives/cursor-pointer/cursor-pointer.directive';
import { MainCardService } from './shared/services/main-card.service';
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


// Directives
import { ClickOutsideDirective } from './../../node_modules/angular2-click-outside/clickOutside.directive';

// Animation
import { FocusDirective } from './shared/directives/focus-input/focus.directive';


// Firebase DataBase
import { AngularFireModule } from '../../node_modules/angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
	apiKey           : "AIzaSyBJ6paj7uVP5Kkk-iYiOXl5Qk-IhMU8D3o",
	authDomain       : "todo-app-13093.firebaseapp.com",
	databaseURL      : "https://todo-app-13093.firebaseio.com",
	projectId        : "todo-app-13093",
	storageBucket    : "todo-app-13093.appspot.com",
	messagingSenderId: "579735635782"
};


@NgModule({
	declarations: [
		AppComponent,
		MainCardComponent,
		TodoCardComponent,
		TodoTaskComponent ,
		FocusDirective,

    // directives
    CheckedBackgroundDirective,
    ClickOutsideDirective,
    CursorPointerDirective
  ],
	imports: [
		BrowserModule,
		HttpModule,
		FormsModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule
  ],
  
	// Making one instance of the service for the whole application
	providers: [
		TodoCardsService, 
		DataStorageService, 
		MainCardService
	],

  bootstrap: [AppComponent]
})
export class AppModule { }
