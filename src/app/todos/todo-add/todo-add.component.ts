import { Component, OnInit } from '@angular/core';
import { ViewModelTodo, TodoService, Todo } from '../todo.service';
import { ActivatedRoute, Router, GuardsCheckEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {
  private now: Date = new Date();
  private todo: ViewModelTodo = {
    completed: false,
    description: null,
    dueDate: { year: this.now.getFullYear(), month: this.now.getMonth(), day: this.now.getDay() },
    title: null
  };
  private createModel: ViewModelTodo = {
    completed: false,
    description: null,
    dueDate: { year: this.now.getFullYear(), month: this.now.getMonth(), day: this.now.getDay() },
    title: null
  };;
  private shouldDeactivate: boolean = true;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TodoService) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params["returnUrl"];
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    return this.todo.title === this.createModel.title
      && this.todo.description === this.createModel.description
      && this.todo.dueDate.year === this.createModel.dueDate.year
      && this.todo.dueDate.month === this.createModel.dueDate.month
      && this.todo.dueDate.day === this.createModel.dueDate.day;
  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof GuardsCheckEnd) {
        this.shouldDeactivate = e.shouldActivate;
      }
    });
  }

  onSubmit() {
    const date = new Date(this.todo.dueDate.year, this.todo.dueDate.month - 1, this.todo.dueDate.day);
    const mappedTodo: Todo = {
      id: this.todo.id,
      completed: this.todo.completed,
      description: this.todo.description,
      dueDate: date,
      title: this.todo.title
    };

    this.service.addNewTodo(mappedTodo)
      .subscribe(result => {
        this.todo = this.createModel;
        this.router.navigate([this.returnUrl || '/todos']);
      }, error => {
        console.error(error);
      });
  }

  cancel() {
    this.todo = this.createModel;
    this.router.navigate([this.returnUrl ||'/todos']);
  }
}
