import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudicationComponent } from './judication.component';

describe('JudicationComponent', () => {
  let component: JudicationComponent;
  let fixture: ComponentFixture<JudicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
