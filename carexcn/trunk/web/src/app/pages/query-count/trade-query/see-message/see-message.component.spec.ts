import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMessageComponent } from './see-message.component';

describe('SeeMessageComponent', () => {
  let component: SeeMessageComponent;
  let fixture: ComponentFixture<SeeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
