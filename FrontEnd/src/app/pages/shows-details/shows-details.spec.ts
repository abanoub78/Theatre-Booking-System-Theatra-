import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsDetails } from './shows-details';

describe('ShowsDetails', () => {
  let component: ShowsDetails;
  let fixture: ComponentFixture<ShowsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
