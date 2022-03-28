import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser?: IUser;

  constructor() { }

  loginUser(username: string, password: string) : boolean {
    this.currentUser = {
      id: 1,
      username: username,
      firstName: 'John',
      lastName: 'Papa'
    };
    return this.isAuthenticated();
  }

  isAuthenticated() : boolean {
    return (this.currentUser?.id ?? 0) > 0;
  }

  updateCurrentUser(firstName: string, lastName : string) : boolean {
    if(!!this.currentUser) {
      this.currentUser.firstName = firstName;
      this.currentUser.lastName = lastName;
      return true;
    }
    return false;
  }
}
