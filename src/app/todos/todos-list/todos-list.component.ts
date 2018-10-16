import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  private todos: Todo[] = [];
  private showCompleted: boolean;

  constructor(
    private route: ActivatedRoute, 
    private todoService: TodoService) { }

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
