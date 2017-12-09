import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRecordComponent } from './transfer-record.component';

describe('TransferRecordComponent', () => {
  let component: TransferRecordComponent;
  let fixture: ComponentFixture<TransferRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
