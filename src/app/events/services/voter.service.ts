import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared';
import { IUser } from 'src/app/user/models/user';
import { ISession } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http : HttpClient, private notificationService: NotificationService) { }

  deleteVoter(eventId: number, session: ISession, username : string) : Observable<ISession> {

    session.voters = session.voters.filter(v => v != username);

    return this.http.delete<ISession>(`/api/events/${eventId}/sessions/${session.id}/voters/${username}`, {})
      .pipe(catchError(this.handleError<ISession>('deleteVoter', undefined)));
  }

  addVoter(eventId: number, session: ISession, username : string) : Observable<ISession> {
    session.voters.push(username);

    return this.http.post<ISession>(`/api/events/${eventId}/sessions/${session.id}/voters/${username}`, {})
      .pipe(catchError(this.handleError<ISession>('addVoter', undefined)));
  }

  private handleError<T>(operation: string = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.notificationService.showError('Error!');
      return of(result as T);
    }
  }
}
