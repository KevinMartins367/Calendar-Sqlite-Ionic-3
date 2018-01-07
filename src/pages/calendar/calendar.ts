import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController  } from 'ionic-angular';
import * as moment from 'moment';

import { Event } from '../../providers/Event-local/Event-local';
import { EventsDaoProvider } from '../../providers/Events-dao/Events-dao';

// No need to import EventModalPage

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {

  eventSource = [];
  viewTitle: string;
  noEventsLabel: string = "No events listed";
  selectedDay = new Date();
  calendar = {
    mode: 'month',  //to inform the calendar form
    locale: 'pt-br', //change the location to your
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, 
              private alertCtrl: AlertController, public ep: EventsDaoProvider) {
    moment.locale('pt-br'); //change the location to your  
    this.get();
  }

  addEvent() {

    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
     
        this.ep.insert(data)
        .then((res: any) => {
          this.getAll(data);
        })
        .catch((e) => {console.error(e);});
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {
    
    let start = moment(event.startTime).format('LTS');
    let end = moment(event.endTime).format('LTS');
    if(event.allDay == true){

      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'All day' + '<br><br>Start: ' + start + '<br><br>end: ' + end,
        buttons: ['OK']
      })
      alert.present();

    }else{

      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'Start: ' + start + '<br><br>end: ' + end,
        buttons: ['OK']
      })
      alert.present();

    }
  }
 
  onTimeSelected(ev) {
      this.selectedDay = ev.selectedTime;
  }

  update(ev){
    let modal = this.modalCtrl.create('EventModalPage', {ev: ev});
    modal.present();
    modal.onDidDismiss(data => {
      
      if (data) {
        this.ep.update(data)
        .then((res: any) => {
          this.delete(ev, true);
          this.getAll(data);
        })
        .catch((e) => {console.error(e);});
      }
    });
  }
  
  delete(ev, act: boolean = false){
    var idx = this.eventSource.indexOf(ev, 0);
    if (idx != -1) {
      this.eventSource.splice(idx, 1); 
    }
    if(act == false){
      this.ep.remove(ev.id)
      .then((res: any) => {
        this.getAll(null);
      })
      .catch((e) => {console.error(e);});
    }
    
  }

  getAll(data){
    
    let eventData = data;
    let events = this.eventSource;

    if (data != null){
      eventData.startTime = new Date(data.startTime);
      eventData.endTime = new Date(data.endTime);
      events.push(eventData);
    }

    for (let i = 0; i < events.length; i++) {

      let element = events[i];
     
      if(moment(element.startTime).format('L') == moment(element.endTime).format('L')){
        if(element.allDay == true){
          element.subText = 'All day';
        }else{
          element.subText = moment(element.startTime).format('LTS');
        }
      } else if(parseInt(moment(element.endTime).format('DD')) > parseInt(moment(element.startTime).format('DD'))){

        if(element.allDay == true){
          element.subText = "All day    " + moment(element.startTime).format('L') +" || " + moment(element.endTime).format('L');
        }else{
          element.subText = moment(element.startTime).format('L') +' || ' + moment(element.endTime).format('L');
        }
      }
    }

    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

  get(){
    this.ep.getAll()
    .then((e: Event[]) => {
      console.log(e);
      for (let i = 0; i < e.length; i++) {
        let ev = { id: e[i].id, title:e[i].title, startTime: new Date(e[i].startTime), endTime: new Date(e[i].endTime), allDay: e[i].allDay, subText: null };
        this.eventSource.push(ev);
      }
      console.log(this.eventSource);
      this.getAll(null);
    })
    .catch((e) => {console.error(e);});
  }
  
}
