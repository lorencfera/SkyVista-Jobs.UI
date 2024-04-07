import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveJobComponent } from './save-job.component';

describe('SaveJobComponent', () => {
  let component: SaveJobComponent;
  let fixture: ComponentFixture<SaveJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
