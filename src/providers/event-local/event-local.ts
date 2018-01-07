export class Event {
  constructor(public id: number,
              public title: string,
              public startTime: string,
              public endTime: string,
              public allDay: boolean) { }
}
