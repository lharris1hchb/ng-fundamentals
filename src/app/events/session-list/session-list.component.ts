import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/services';
import { ISession } from '../models/session';
import { VoterService } from '../services/voter.service';

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

  constructor(private auth : AuthService,
              private router : Router,
              private voterService : VoterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  toggleVote(session : ISession) : void {
    if(this.auth.currentUser) {
      const username : string = this.auth.currentUser.username;
      if(usernameHasVoted(session, username)) {
        this.voterService.deleteVoter(session, username).subscribe(
          this.updateSession
        );
      }
      else {
        this.voterService.addVoter(session, username).subscribe(
          this.updateSession
        );
      }
    }
    else {
      this.router.navigate(['/user/login']);
    }
  }

  userHasVoted(session : ISession) : boolean {
    return this.auth.currentUser ? usernameHasVoted(session, this.auth.currentUser.username)
              : false;
  }

  private updateSession(updatedSession : ISession) : void {
    this.sessions?.every(s => {
      if(s.id == updatedSession.id) {
        s = updatedSession;
        this.update();
        return false;
      }
      return true;
    })
  }

  private update() {
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

function usernameHasVoted(session: ISession, username : string) : boolean {
  return session.voters.includes(username);
}

