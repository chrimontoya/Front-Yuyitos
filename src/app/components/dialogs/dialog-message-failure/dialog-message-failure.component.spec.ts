import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageFailureComponent } from './dialog-message-failure.component';

describe('DialogMessageFailureComponent', () => {
  let component: DialogMessageFailureComponent;
  let fixture: ComponentFixture<DialogMessageFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageFailureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
