import { TestBed, inject } from '@angular/core/testing';

import { VotingdoneService } from './votingdone.service';

describe('VotingdoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingdoneService]
    });
  });

  it('should be created', inject([VotingdoneService], (service: VotingdoneService) => {
    expect(service).toBeTruthy();
  }));
});
