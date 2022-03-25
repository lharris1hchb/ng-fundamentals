import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IEvent } from '../models/event';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {
  readonly earlyStartTime : string = '8:00 am';
  readonly lateStartTime : string = '10:00 am';

  @Input() event!: IEvent;

  constructor() { }

  ngOnInit(): void {
  }

  getStartTimeClass() : any {
    const isEarlyStart = this.event?.time === this.earlyStartTime;
    return { green: isEarlyStart, bold: isEarlyStart };
  }

}
