import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ISession } from '../models/session';

import { VoterService } from './voter.service';

describe('VoterService', () => {
  let service: VoterService;
  let mockHttp: any;
  let mockNotificationService: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    mockNotificationService = jasmine.createSpyObj('mockNotificationService', ['showError']);

    service = new VoterService(mockHttp, mockNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove the voter from list of voters', () => {
    var session = { voters: [ 'joe', 'john'], id: 6 };

    mockHttp.delete.and.returnValue(of(false));

    service.deleteVoter(1, <ISession>session, 'joe');

    expect(session.voters.length).toBe(1);
  });

  it('should call the correct delete url', () => {
    var session = { voters: [ 'joe', 'john'], id: 6 };

    mockHttp.delete.and.returnValue(of(false));

    service.deleteVoter(1, <ISession>session, 'joe');

    expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/1/sessions/6/voters/joe`);
  });

  it('should call the correct post url', () => {
    var session = { voters: ['john'], id: 6 };

    mockHttp.post.and.returnValue(of(false));

    service.addVoter(1, <ISession>session, 'joe');

    expect(mockHttp.delete).toHaveBeenCalledWith(`/api/events/1/sessions/6/voters/joe`, {});
  });
});
