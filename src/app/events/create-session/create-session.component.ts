import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { restrictedWords } from 'src/app/shared';
import { ISession } from '../models/session';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  name !: FormControl;
  presenter !: FormControl;
  duration !: FormControl;
  level !: FormControl;
  abstract !: FormControl;
  newSessionForm !: FormGroup;

  constructor(private router : Router) { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);
    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  saveSession(formValue : any) : void {

    let session : ISession = {
      id: 0,
      name: formValue.name,
      duration: Number(formValue.duration),
      level: formValue.level,
      presenter: formValue.presenter,
      abstract: formValue.abstract,
      voters: []
    };

    console.log(session);

  }

  cancel() : void {
    this.router.navigate(['/']);
  }

}
