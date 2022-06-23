import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageSuccessComponent } from './dialog-message-success.component';

describe('DialogMessageSuccessComponent', () => {
  let component: DialogMessageSuccessComponent;
  let fixture: ComponentFixture<DialogMessageSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMessageSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
