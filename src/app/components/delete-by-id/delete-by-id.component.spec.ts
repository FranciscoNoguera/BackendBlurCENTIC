import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteByIdComponent } from './delete-by-id.component';

describe('DeleteByIdComponent', () => {
  let component: DeleteByIdComponent;
  let fixture: ComponentFixture<DeleteByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
