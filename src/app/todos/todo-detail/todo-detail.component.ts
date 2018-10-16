import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, ParamMap, GuardsCheckEnd } from '@angular/router';
import { Todo, TodoService, ViewModelTodo } from '../todo.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
//TODO:Guard-Implement CanComponentDeactivate
export class TodoDetailComponent implements OnInit {
  private todo: ViewModelTodo | never;
  private editModel: ViewModelTodo | never;
  private shouldDeactivate: boolean = true;
  private returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TodoService) { }

  ngOnInit() {
    // TODO:QueryParams-Consume query parameters from router
    // TODO:Routes-Get route id and pass it to service method to get observable back
    // const todos$ =?

    // TODO: Uncomment
    // todos$.subscribe(todo => {
    //   if (todo === null || typeof todo === 'undefined') {
    //     this.todo = this.editModel = null;
    //     this.router.navigate(['/404'], { skipLocationChange: true });
    //     return;
    //   }

    //   const date = new Date(todo.dueDate);
    //   this.todo = {
    //     id: todo.id,
    //     completed: todo.completed,
    //     description: todo.description,
    //     dueDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() },
    //     title: todo.title
    //   };
    //   this.editModel = {
    //     id: todo.id,
    //     completed: todo.completed,
    //     description: todo.description,
    //     dueDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() },
    //     title: todo.title
    //   };
    // }, error => {
    //   console.error(error);
    //   this.todo = this.editModel;
    //   this.router.navigate(['/404'], { skipLocationChange: true });
    // });

    // TODO:Guard-Check for the GuardsCheckEnd event to decide about deactivation (hack)
  }

  // TODO:Guard-Implement the CanComponentDeactivate method and return is the todo is valid or not

  private isValidTodo(): boolean {
    return this.todo === null ||
      (this.todo.title === this.editModel.title
        && this.todo.description === this.editModel.description
        && this.todo.dueDate.year === this.editModel.dueDate.year
        && this.todo.dueDate.month === this.editModel.dueDate.month
        && this.todo.dueDate.day === this.editModel.dueDate.day);
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

    this.service.updateTodo(mappedTodo)
      .subscribe(result => {
        this.todo = this.editModel;
        // TODO:Links-Navigate to the returnUrl or if not set to home page
      }, error => {
        console.error(error);
      });
  }

  cancel() {
    this.todo = this.editModel;
    // TODO:Links-Navigate to the returnUrl or if not set to home page
  }
}
