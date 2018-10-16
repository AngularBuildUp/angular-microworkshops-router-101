import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './header-nav/header-nav.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { NgbCollapseModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    NgbCollapseModule,
    NgbTooltipModule,
    FontAwesomeModule,
    RouterModule
  ],
  declarations: [
    HeaderNavComponent,
    SidebarNavComponent
  ],
  exports: [
    HeaderNavComponent,
    SidebarNavComponent
  ]
})
export class NavigationModule { }
