import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardManageComponent } from './card-manage.component';

describe('CardManageComponent', () => {
  let component: CardManageComponent;
  let fixture: ComponentFixture<CardManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
