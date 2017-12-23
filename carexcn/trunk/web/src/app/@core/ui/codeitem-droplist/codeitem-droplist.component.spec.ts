import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeitemDroplistComponent } from './codeitem-droplist.component';

describe('CodeitemDroplistComponent', () => {
  let component: CodeitemDroplistComponent;
  let fixture: ComponentFixture<CodeitemDroplistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeitemDroplistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeitemDroplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
