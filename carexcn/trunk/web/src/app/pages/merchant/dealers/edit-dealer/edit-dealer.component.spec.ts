import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDealerComponent } from './edit-dealer.component';

describe('AddDealerComponent', () => {
  let component: EditDealerComponent;
  let fixture: ComponentFixture<EditDealerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDealerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
