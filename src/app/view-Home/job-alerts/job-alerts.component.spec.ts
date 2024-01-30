import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAlertsComponent } from './job-alerts.component';

describe('JobAlertsComponent', () => {
  let component: JobAlertsComponent;
  let fixture: ComponentFixture<JobAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
