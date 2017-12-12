import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldLicenceComponent } from './old-licence.component';

describe('OldLicenceComponent', () => {
  let component: OldLicenceComponent;
  let fixture: ComponentFixture<OldLicenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldLicenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
