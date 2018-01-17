import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YsCardComponent } from './ys-card.component';

describe('YsCardComponent', () => {
  let component: YsCardComponent;
  let fixture: ComponentFixture<YsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
