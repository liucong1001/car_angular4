import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YsFormBuilderComponent } from './ys-form-builder.component';

describe('YsFormBuilderComponent', () => {
  let component: YsFormBuilderComponent;
  let fixture: ComponentFixture<YsFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YsFormBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YsFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
