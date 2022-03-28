import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { ISession } from '../models/session';
import { restrictedWordsValidator } from 'src/app/shared/restricted-words.validator';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  @Output() saveNewSession : EventEmitter<ISession> = new EventEmitter<ISession>();
  @Output() cancelAddSession : EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWordsValidator(['foo', 'bar'])]);
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

    this.saveNewSession.emit(session);

  }

  cancel() : void {
    this.cancelAddSession.emit(true);
  }

}
