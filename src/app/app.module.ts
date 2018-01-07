import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { NgCalendarModule } from 'ionic2-calendar';
import { SQLite } from '@ionic-native/sqlite';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { CalendarPage } from '../pages/calendar/calendar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { EventsDaoProvider } from '../providers/events-dao/events-dao';


@NgModule({
  declarations: [
    MyApp,
    CalendarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp, {
      monthShortNames:["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", 'Jul', 'Ago', 'Set', 'Out', 'Nov', "Dez"] 
      //So you do not repeat in each one ion-datetime add the strings for each month here, 
      // you can add the days of the week both in full names and in abbreviations, 
      // using DayNames and dayShortNames respectively both being array's as informed in the documentation
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: LOCALE_ID, useValue: 'pt-Br' }, //change the location to your  
    SQLite,
    DatabaseProvider,
    EventsDaoProvider,
  ]
})
export class AppModule {}
