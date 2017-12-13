import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionManageComponent } from './auction-manage.component';

describe('AuctionManageComponent', () => {
  let component: AuctionManageComponent;
  let fixture: ComponentFixture<AuctionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
