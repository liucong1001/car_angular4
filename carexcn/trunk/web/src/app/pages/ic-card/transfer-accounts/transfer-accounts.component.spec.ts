import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferAccountsComponent } from './transfer-accounts.component';

describe('TransferAccountsComponent', () => {
  let component: TransferAccountsComponent;
  let fixture: ComponentFixture<TransferAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
