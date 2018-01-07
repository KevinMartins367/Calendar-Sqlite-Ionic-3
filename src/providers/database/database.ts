import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {  }

  public getDB() {
    return this.sqlite.create({
      name: 'infocli.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Creating as tables
        this.createTables(db);
 
        // insert data
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }


  private createTables(db: SQLiteObject) {
    // Creating as tables
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS events (id integer primary key AUTOINCREMENT NOT NULL, title TEXT, startTime TEXT, endTime TEXT, allDay integer)'],])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    
    db.executeSql('select COUNT(id) as qtd from eventos', {})
    .then((data: any) => {
      //If there is no record
      if (data.rows.item(0).qtd == 0) {

        // insert data

        db.sqlBatch([
          ['insert into events (title, startTime, endTime, allDay) values (?,?,?,?)', 
          [ 'test', '2018-01-07T12:00:00-02:00', '2018-01-07T14:00:00-02:00', 0]]
        ])
        .then(() => console.log('event data included'))
        .catch(e => console.error('Error adding data', e));

      }
    })
    .catch(e => console.error('Error verifying qtd of events', e));
  }
}

