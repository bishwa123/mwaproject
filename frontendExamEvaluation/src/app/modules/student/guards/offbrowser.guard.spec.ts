import { TestBed, async, inject } from '@angular/core/testing';

import { OffbrowserGuard } from './offbrowser.guard';

describe('OffbrowserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OffbrowserGuard]
    });
  });

  it('should ...', inject([OffbrowserGuard], (guard: OffbrowserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
