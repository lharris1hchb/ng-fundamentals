import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from '../models/login-user';
import { AuthService } from '../services/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username !: string;
  password !: string;
  showAllErrors : boolean = false;

  readonly baseUrl : string[] = [''];

  constructor(private authService: AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login(formValues : any) : void {
    if(this.authService.loginUser(formValues.username, formValues.password)) {
      this.router.navigate(this.baseUrl);
    }
  }

  cancel() : void {
    this.router.navigate(this.baseUrl);
  }

  mouseoverLogin(isOver: boolean) : void {
    this.showAllErrors = isOver;
  }


}
