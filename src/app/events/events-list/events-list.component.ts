import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/common/notification.service';
import { EventService } from '../services/event.service';
import { IEvent } from '../models/event';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  events !: IEvent[];

  constructor(private eventService: EventService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.events = this.route.snapshot.data['events'];
  }

  handleThumbnailClick(eventName: string) : void {
    this.notificationService.showSuccess(eventName);
  }
}
