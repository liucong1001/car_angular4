import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrusterInfoComponent } from './truster-info.component';

describe('TrusterInfoComponent', () => {
  let component: TrusterInfoComponent;
  let fixture: ComponentFixture<TrusterInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrusterInfoComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrusterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
