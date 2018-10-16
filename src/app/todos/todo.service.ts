import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';

export type Todo = {
  id?: number,
  title: string,
  description?: string,
  dueDate: Date
  completed: boolean
};

export type ViewModelTodo = {
  id?: number,
  title?: string,
  description?: string,
  dueDate?: NgbDateStruct
  completed: boolean
}

export type Query = {
  allTodos: Todo[];
  getAllTodayTodos: Todo[];
  getAllWeekTodos: Todo[];
  Todo: Todo;
  updateTodo: Todo;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private apollo: Apollo) { }

  getAllTodos(): Observable<Todo[]> {
    return this.apollo.watchQuery<Query>({
      query: gql`
      query allTodos {
        allTodos {
          id,
          title,
          description,
          dueDate,
          completed
        }
      }
    `
    }).valueChanges.pipe(
      map(result => result.data.allTodos)
    );
  }

  getAllTodayTodos(): Observable<Todo[]> {
    const now = new Date();
    return this.apollo.watchQuery<Query>({
      query: gql`
      query getAllTodayTodos {
        getAllTodayTodos: allTodos(filter: {
          dueDate_gt: "${new Date(now.setDate(now.getDate() - 1))}",
          dueDate_lt: "${new Date(now.setDate(now.getDate() + 1))}"
        }) {
          id,
          title,
          description,
          dueDate,
          completed
        }
      }
    `
    }).valueChanges.pipe(
      map(result => result.data.getAllTodayTodos)
    );
  }

  getAllWeekTodos(): Observable<Todo[]> {
    const now = new Date();
    return this.apollo.watchQuery<Query>({
      query: gql`
      query getAllWeekTodos {
        getAllWeekTodos: allTodos(filter: {
          dueDate_gt: "${new Date(now.setDate(now.getDate() - 1))}",
          dueDate_lt: "${new Date(now.setDate(now.getDate() + 7))}",
          completed:false
        }) {
          id,
          title,
          description,
          dueDate,
          completed
        }
      }
    `
    }).valueChanges.pipe(
      map(result => result.data.getAllWeekTodos)
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const description = todo.description ? `"${todo.description}"`: null;
    return this.apollo.mutate({
      mutation: gql`
      mutation UpdateTodo {
        updateTodo(id:"${todo.id}", title:"${todo.title}", description:${description}, dueDate:"${todo.dueDate}", completed:${todo.completed}) {
          id
          title
          description
          dueDate
          completed
        }
      }
      `
    }).pipe(
      map(value => {
        return value.data.updateTodo as Todo;
      })
    );
  }

  addNewTodo(todo: Todo): Observable<Todo> {
    const id = new Date().getTime();
    const description = todo.description ? `"${todo.description}"`: null;
    return this.apollo.mutate({
      mutation: gql`
      mutation AddTodo {
        createTodo(id:"${id}", title:"${todo.title}", description:${description}, dueDate:"${todo.dueDate}", completed:${todo.completed}) {
          id
          title
          description
          dueDate
          completed
        }
      }
      `
    }).pipe(
      map(value => {
        return value.data.createTodo as Todo;
      })
    );
  }

  markAsComplete(id: number): Observable<{}>  {
    return this.apollo.mutate({
      mutation: gql`
      mutation {
        updateTodo(id:"${id}", completed:true) {
          id
          completed
        }
      }
      `
    });
  }

  getTodoById(id: number): Observable<Todo> {
    return this.apollo.watchQuery<Query>({
      query: gql`
      query getTodoById {
        Todo(id: ${id}) {
          id,
          title,
          description,
          dueDate,
          completed
        }
      }
    `
    }).valueChanges.pipe(
      map(result => {
        return result.data.Todo;
      })
    );
  }
}
