import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPage } from './calendar';

@NgModule({
  declarations: [
    CalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarPage),
    NgCalendarModule
  ],
})
export class CalendarPageModule {}
