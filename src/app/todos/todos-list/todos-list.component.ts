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
    // TODO:Resolver-Consume data from resolver and just assign to todos
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
