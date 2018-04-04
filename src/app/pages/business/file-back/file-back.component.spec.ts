import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileBackComponent } from './file-back.component';

describe('FileBackComponent', () => {
  let component: FileBackComponent;
  let fixture: ComponentFixture<FileBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
