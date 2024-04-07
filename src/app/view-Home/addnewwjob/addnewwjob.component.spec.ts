import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewwjobComponent } from './addnewwjob.component';

describe('AddnewwjobComponent', () => {
  let component: AddnewwjobComponent;
  let fixture: ComponentFixture<AddnewwjobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewwjobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddnewwjobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
