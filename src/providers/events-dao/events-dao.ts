import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Event } from '../event-local/event-local';
import 'rxjs/add/operator/map';

@Injectable()
export class EventsDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }

  public insert(ev: Event) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into Events (title, startTime, endTime, allDay) values (?, ?, ?, ?)';
        let data = [ev.title, ev.startTime, ev.endTime, ev.allDay ? 1 : 0];
        
        // as sqlite does not support boolean variables use 1 or 0 for typescript to understand true and false

        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(ev: Event) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Events set title = ?, startTime = ?, endTime = ?, allDay = ? where id = ?';
        let data = [ev.title, ev.startTime, ev.endTime, ev.allDay ? 1 : 0, ev.id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT id, title, startTime, endTime, allDay FROM Events';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let Events: any[] = [];
              
              // I made the query return an array to make it easier to manipulate and reuse this structure for other queries
              
              for (var i = 0; i < data.rows.length; i++) {
                var Event = data.rows.item(i);
                Events.push(Event);
              }              
              return Events;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Events where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let Events: any[] = [];
              
              // I made the query return an array to make it easier to manipulate and reuse this structure for other queries

              for (var i = 0; i < data.rows.length; i++) {
                var Event = data.rows.item(i);
                Events.push(Event);
              }
              return Events;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from Events where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
