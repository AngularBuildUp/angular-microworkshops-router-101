import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { Todo, TodoService } from "./todo.service";
import { take, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";

// TODO:Resolver-Implement resolver for classes 'all', 'today' and 'week'