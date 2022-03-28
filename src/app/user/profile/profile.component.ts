import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm !: FormGroup;
  private firstName !: FormControl;
  private lastName !: FormControl;

  constructor(private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    const user = this.auth.currentUser;
    const nameValidators = [
      Validators.required,
      Validators.pattern('a-zA-Z].*')
    ];

    this.firstName = new FormControl(user?.firstName, nameValidators);
    this.lastName = new FormControl(user?.lastName, nameValidators);

    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel() : void {
    this.router.navigate(['/']);
  }

  saveProfile(formValues: any) : void {
    if(this.profileForm.valid) {
      if (this.auth.updateCurrentUser(formValues.firstName, formValues.lastName)) {
        this.router.navigate(['/']);
      }
    }
  }

  validateLastName() : boolean {
    return this.lastName.valid
        || this.lastName.untouched;
  }

  validateFirstName() : boolean {
    return this.firstName.valid
        || this.firstName.untouched;
  }

}
