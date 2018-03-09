import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveNoComponent } from './archive-no.component';

describe('ArchiveNoComponent', () => {
  let component: ArchiveNoComponent;
  let fixture: ComponentFixture<ArchiveNoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveNoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
