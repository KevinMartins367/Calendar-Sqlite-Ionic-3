import { Component } from '@angular/core';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab3Root = CalendarPage;

  constructor() {

  }
}
