import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { IEvent } from '../models/event';
import { ISession } from '../models/session';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  event?: IEvent;
  addMode : boolean = false;
  filterBy : string = 'all';
  sortBy: string = 'votes';

  constructor(private eventService : EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.event = this.eventService.getEvent(id);
  }

  addSession() : void {
    this.addMode = true;
  }

  saveNewSession(newSession : ISession) : void {
    console.log(newSession);
    if(this.event) {
      const nextId = Math.max.apply(null, this.event?.sessions.map(s => s.id));
      newSession.id = nextId + 1;
      this.event.sessions.push(newSession);
      this.eventService.updateEvent(this.event);
    }
    this.addMode = false;
  }

  cancelAddSession(cancelAddSession : boolean) : void {
    this.addMode = !cancelAddSession;
  }

  setFilterBy(filter : string) {
    this.filterBy = filter;
  }

  setSortBy(sortBy : string) {
    this.sortBy = sortBy;
  }

}
