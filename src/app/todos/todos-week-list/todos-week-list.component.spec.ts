import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosWeekListComponent } from './todos-week-list.component';

describe('TodosWeekListComponent', () => {
  let component: TodosWeekListComponent;
  let fixture: ComponentFixture<TodosWeekListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosWeekListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosWeekListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
