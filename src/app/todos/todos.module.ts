import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosListComponent } from './todos-list/todos-list.component';
import { TodosTodayListComponent } from './todos-today-list/todos-today-list.component';
import { TodosWeekListComponent } from './todos-week-list/todos-week-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodosComponent } from './todos/todos.component';
import { TodoResolverService } from './todo-resolver.service';
import { TodoService } from './todo.service';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { NavigationModule } from '../navigation/navigation.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { DateService } from '../date.service';

@NgModule({
  imports: [
    CommonModule,
    NavigationModule,
    FontAwesomeModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    TodosRoutingModule
  ],
  declarations: [
    TodosListComponent,
    TodosTodayListComponent,
    TodosWeekListComponent,
    TodoDetailComponent,
    TodosComponent,
    TodoAddComponent
  ],
  providers: [
    TodoResolverService,
    TodoService
  ]
})
export class TodosModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:4200/api/' }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });
  }
}
