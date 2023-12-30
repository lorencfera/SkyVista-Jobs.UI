import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyJobPostIdComponent } from './only-job-post-id.component';

describe('OnlyJobPostIdComponent', () => {
  let component: OnlyJobPostIdComponent;
  let fixture: ComponentFixture<OnlyJobPostIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlyJobPostIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlyJobPostIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
