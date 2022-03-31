import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser?: IUser;

  constructor(private http: HttpClient, private notificationService : NotificationService) { }

  loginUser(username: string, password: string) : Observable<any> {
    const data = { username: username, password: password };

    return this.http.post('/api/login', data)
      .pipe(tap(data => this.currentUser = <IUser>(data as any)['user']))
      .pipe(catchError(err => of(false) ));
  }

  isAuthenticated() : boolean {
    return (this.currentUser?.id ?? 0) > 0;
  }

  checkAuthenticationStatus() : void {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if(data instanceof Object) {
          this.currentUser = data as IUser;
        }
      }))
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName : string) : void {
    if(this.currentUser) {
      this.currentUser.firstName = firstName;
      this.currentUser.lastName = lastName;
      this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser).subscribe(
        () => this.notificationService.showSuccess('Profile Saved'),
        (error) => this.notificationService.showError('Error saving profile')
      );
    }
  }

  logout(): Observable<any> {
    this.currentUser = undefined;
    return this.http.post(`/api/logout`, {});
  }

}
