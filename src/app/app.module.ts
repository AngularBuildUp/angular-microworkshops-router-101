import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { TodosModule } from './todos/todos.module';
// TODO:Routes - import { CanDeactivateGuard } from './can-deactivate.guard';
import { NavigationModule } from './navigation/navigation.module';
import { DateService } from './date.service';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    NavigationModule,
    // TODO:Routes-Add routing related modules
  ],
  providers: [
    // TODO:Guard-Can Deactivate guard registration
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
