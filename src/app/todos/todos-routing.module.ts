import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodosTodayListComponent } from './todos-today-list/todos-today-list.component';
import { TodosWeekListComponent } from './todos-week-list/todos-week-list.component';
import { CanDeactivateGuard } from '../can-deactivate.guard';
import { TodoResolverService } from './todo-resolver.service';
import { TodoAddComponent } from './todo-add/todo-add.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    children: [
      {
        path: '',
        children: [
          {
            path: 'today',
            component: TodosTodayListComponent,
            resolve: {
              todos: TodoResolverService
            },
            data: {
              class: 'today'
            }
          },
          {
            path: 'week',
            component: TodosWeekListComponent,
            resolve: {
              todos: TodoResolverService
            },
            data: {
              class: 'week'
            }
          },
          {
            path: 'add',
            component: TodoAddComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: ':id',
            component: TodoDetailComponent,
            canDeactivate: [CanDeactivateGuard]
          },
          {
            path: '',
            component: TodosListComponent,
            resolve: {
              todos: TodoResolverService
            },
            data: {
              class: 'all'
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
