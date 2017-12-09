import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumeRecordComponent } from './consume-record.component';

describe('ConsumeRecordComponent', () => {
  let component: ConsumeRecordComponent;
  let fixture: ComponentFixture<ConsumeRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumeRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
