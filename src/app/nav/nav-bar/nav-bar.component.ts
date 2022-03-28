import { Component, OnInit } from '@angular/core';
import { IUser } from '../../user/models/user';
import { AuthService } from '../../user/services/';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser?: IUser = this.auth.currentUser;


  constructor(private auth : AuthService) { }

  ngOnInit(): void {

  }

  isAuthenticated() : boolean {
    const isAuth = this.auth.isAuthenticated();
    if(isAuth) {
      this.currentUser = this.auth.currentUser;
    }
    return isAuth;
  }

}
