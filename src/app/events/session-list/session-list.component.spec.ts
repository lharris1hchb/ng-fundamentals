import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/services';
import { DurationPipe } from '../services/duration.pipe';
import { VoterService } from '../services/voter.service';

import { SessionListComponent } from './session-list.component';

describe('SessionListComponent', () => {
  let mockAuth: any;
  let mockRouter: any;
  let mockVoterService: any;
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debug: DebugElement;

  beforeEach(async () => {

    mockAuth = { currentUser: { username: 'username' } };
    mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockVoterService = jasmine.createSpyObj('mockVoterService', ['deleteVoter', 'addVoter']);

    TestBed.configureTestingModule({
      declarations: [
        SessionListComponent,
        DurationPipe
      ],
      providers: [
        { provide: AuthService, useValue: mockAuth },
        { provide: Router, useValue: mockRouter },
        { provide: VoterService, useValue: mockVoterService },
      ],
      schemas:[
        NO_ERRORS_SCHEMA
      ]
    });
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial display', () => {

    it('should have the correct title', () => {
      component.sessions = [{ name: 'Session 1', id: 3, duration: 1, presenter: 'joe',
                            level: 'beginner', abstract: 'abstract', voters: ['john', 'bill'] }];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 1;
      component.ngOnChanges({});

      fixture.detectChanges();

      expect(element.querySelector('[well-title]')?.textContent).toContain('Session 1');
      expect(debug.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
    });

  });

});
