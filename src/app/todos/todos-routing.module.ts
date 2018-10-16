import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodosTodayListComponent } from './todos-today-list/todos-today-list.component';
import { TodosWeekListComponent } from './todos-week-list/todos-week-list.component';
// TODO:Guards - import { CanDeactivateGuard } from '../can-deactivate.guard';
// TODO:Resolver - import { TodoResolverService } from './todo-resolver.service';
import { TodoAddComponent } from './todo-add/todo-add.component';

// TODO:Routes-Register routes for todo entire module

@NgModule({
  imports: [
    // TODO:Routes-Register all child routes defined above
  ],
  exports: [
    // TODO:Routes-Export RouterModule
  ]
})
export class TodosRoutingModule { }
