import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo, TodoService, ViewModelTodo } from '../todo.service';
import { DateService, Week } from '../../date.service';
import { NgbDateStruct } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { NgForm, NgControl, NgModel } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-todos-week-list',
  templateUrl: './todos-week-list.component.html',
  styleUrls: ['./todos-week-list.component.css']
})
export class TodosWeekListComponent implements OnInit {
  private week: Week;
  private todos: { [index: number]: Todo[] } = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dateService: DateService,
    private todoService: TodoService) { }

  ngOnInit() {
    this.week = this.dateService.getNextSevenDays();
    this.route.data.subscribe((data: { todos: Todo[] }) => {
      const todos: Todo[] = data.todos.map(todo => {
        return {
          id: todo.id,
          title: todo.title,
          description: todo.description,
          dueDate: new Date(todo.dueDate),
          completed: todo.completed
        }
      });

      const filterByDate = this.filterTodos(todos);
      this.week.days.forEach((day, index) => {
        this.todos[index] = filterByDate(day.date);
      });
    });
  }

  private filterTodos(todos: Todo[]): (date: Date) => Todo[] {
    return date => {
      return todos.filter(todo => {
        return todo.dueDate.getDay() === date.getDay() &&
          todo.dueDate.getMonth() === date.getMonth() &&
          todo.dueDate.getFullYear() === date.getFullYear();
      });
    }
  }

  private addTask(control: NgModel, index: NgModel, dueDate: NgModel, form: NgForm) {
    let task: Todo = {
      title: control.value,
      dueDate: new Date(dueDate.value),
      completed: false
    };

    this.todos[+index.value].push(task);
    this.todoService.addNewTodo(task).subscribe(result => {
      task.id = result.id;
      form.reset();
    }, error => {
      console.error(error);
    });
  }

  private markAsCompleted(todo: Todo, index: number) {
    const itemIndex = this.todos[index].indexOf(todo);
    this.todos[index].splice(itemIndex, 1);
    this.todoService.markAsComplete(todo.id).subscribe();
  }
}
