import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/user/models/user';
import { ISession } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor() { }

  deleteVoter(session: ISession, username : string) : Observable<ISession> {
    session.voters = session.voters.filter(v => v != username);

    let subject = new Subject<ISession>();
    setTimeout(() => { subject.next(session); subject.complete(); }, 100);
    return subject;
  }

  addVoter(session: ISession, username : string) : Observable<ISession> {
    session.voters.push(username);

    let subject = new Subject<ISession>();
    setTimeout(() => { subject.next(session); subject.complete(); }, 100);
    return subject;
  }
}
