import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  CreateSessionComponent,
  SessionListComponent
} from './events/index';

import { NavBarComponent } from './nav/index';
import { Error404Component } from './errors/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapsibleWellComponent } from './shared/collapsible-well/collapsible-well.component';
import { DurationPipe } from './events/services/duration.pipe';
import { UpvoteComponent } from './events/upvote/upvote.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    UpvoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: 'canLeaveFormDefault', useValue: checkDirtyState }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function checkDirtyState(component:CreateEventComponent) {
  if(component.isDirty) {
    return window.confirm('You have not saved, do you really want to cancel?');
  }
  return true;
}
