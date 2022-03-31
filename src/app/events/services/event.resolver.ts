import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IEvent } from '../models/event';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<any> {

  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent> {
    const id = Number(route.params['id']);
    return this.eventService.getEvent(id);
  }
}
