import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosTodayListComponent } from './todos-today-list.component';

describe('TodosTodayListComponent', () => {
  let component: TodosTodayListComponent;
  let fixture: ComponentFixture<TodosTodayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosTodayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosTodayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
