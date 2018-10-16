import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todos-today-list',
  templateUrl: './todos-today-list.component.html',
  styleUrls: ['./todos-today-list.component.css']
})
export class TodosTodayListComponent implements OnInit {
  private todos: Todo[] = [];
  private showCompleted: boolean;

  constructor(
    private route: ActivatedRoute, 
    private todoService: TodoService, 
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: { todos: Todo[] }) => {
      this.todos = data.todos;
    });
  }

  private hasTodos(): boolean {
    return this.todos.length > 0 && this.todos.some(todo => {
      return todo.completed == false;
    }) || this.showCompleted == true;
  }

  private toggleCompleted() {
    this.showCompleted = !this.showCompleted;
  }

  private close(id: number) {
    this.todos.forEach(todo => {
      if (todo.id === id) {
        todo.completed = true;
        this.todoService.markAsComplete(todo.id).subscribe();
      }
    });
  }
}
