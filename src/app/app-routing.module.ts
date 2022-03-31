import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsListResolverService,
  CreateSessionComponent
} from './events/index';
import { Error404Component } from './errors/index';
import { EventResolver } from './events/services/event.resolver';

const routes: Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events:EventsListResolverService} },
  { path: 'events/new', component: CreateEventComponent, canDeactivate:['canLeaveFormDefault'] },
  { path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver } },
  { path: 'events/sessions/new', component: CreateSessionComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
