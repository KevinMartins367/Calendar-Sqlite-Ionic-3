import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {

  event = { id:null, title:null, startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, subText: null };
  minDate = new Date().toISOString();

    // as in the database and in the Event the items are with the same name as those implemented in Object event, 
    // it is not necessary to filter it, if you want to add something in the table, create the same item in Object event and in Event 
    // or filter before sending to the functions EventsDaoProvider

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    if(this.navParams.get('ev')){
      let ev = this.navParams.get('ev');
      
      this.event.id = ev.id;
      this.event.allDay = ev.allDay;
      this.event.endTime = moment(ev.endTime).format();
      this.event.startTime = moment(ev.startTime).format();
      this.event.subText = ev.subText;
      this.event.title = ev.title;
    }else{
      moment.locale('pt-br'); //change the location to your  
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event.startTime = preselectedDate;
      this.event.endTime = preselectedDate;
    }
    

  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
