import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameItemComponent } from './create-game-item.component';

describe('CreateGameItemComponent', () => {
  let component: CreateGameItemComponent;
  let fixture: ComponentFixture<CreateGameItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGameItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
