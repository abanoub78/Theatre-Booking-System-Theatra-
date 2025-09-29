import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowForm } from './show-form';

describe('ShowForm', () => {
  let component: ShowForm;
  let fixture: ComponentFixture<ShowForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
