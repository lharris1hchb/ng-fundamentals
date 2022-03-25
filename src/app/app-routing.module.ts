import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsListResolverService,
  EventRouteActivatorService
} from './events/index';
import { Error404Component } from './errors/index';

const routes: Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events:EventsListResolverService} },
  { path: 'events/new', component: CreateEventComponent, canDeactivate:['canDeactivateCreateEvent'] },
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivatorService] },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
