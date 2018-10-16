import { Component, OnInit } from '@angular/core';
import { ViewModelTodo, TodoService, Todo } from '../todo.service';
import { ActivatedRoute, Router, GuardsCheckEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CanComponentDeactivate } from '../../can-deactivate.guard';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
// TODO:Guard-Implement CanComponentDeactivate
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
    private service: TodoService) { }

  // TODO:Guard-Implement CanComponentDeactivate method and return answer if the todo is valid or not

  private isValidTodo(): boolean {
    return this.todo.title === this.createModel.title
      && this.todo.description === this.createModel.description
      && this.todo.dueDate.year === this.createModel.dueDate.year
      && this.todo.dueDate.month === this.createModel.dueDate.month
      && this.todo.dueDate.day === this.createModel.dueDate.day;
  }

  ngOnInit() {
    // TODO:QueryParams-Consume query parameter from returnUrl
    // TODO:Guard-Check for the GuardsCheckEnd event to decide about deactivation (hack)
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
        // TODO:Links-Navigate to the returnUrl or if not set to home page
      }, error => {
        console.error(error);
      });
  }

  cancel() {
    this.todo = this.createModel;
    // TODO:Links-Navigate to the returnUrl or if not set to home page
  }
}
