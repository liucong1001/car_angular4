import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSuccessComponent } from './print-success.component';

describe('PrintSuccessComponent', () => {
  let component: PrintSuccessComponent;
  let fixture: ComponentFixture<PrintSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
