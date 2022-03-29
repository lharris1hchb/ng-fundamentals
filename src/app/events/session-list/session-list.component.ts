import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISession } from '../models/session';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})

export class SessionListComponent implements OnChanges {

  @Input() sessions: ISession[] | undefined;
  @Input() filterBy: string | undefined;
  @Input() sortBy: string | undefined;

  visibleSessions : ISession[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const sessions = this.sessions ?? [];
    const filterBy = this.filterBy ?? 'all';
    this.visibleSessions = filterSessions(sessions, filterBy);
    this.visibleSessions.sort(this.sortBy == 'name' ? sortByNameAsc : sortByVotesDesc);
  }

}

function filterSessions(sessions: ISession[], filter : string) : ISession[] {
  if(filter === 'all') {
    return sessions.slice(0);
  }
  else {
    return sessions.filter(session => session.level.toLowerCase() === filter.toLowerCase());
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if(s1.name > s2.name)
    return 1;
  else if (s1.name == s2.name)
    return 0;
  else
    return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
