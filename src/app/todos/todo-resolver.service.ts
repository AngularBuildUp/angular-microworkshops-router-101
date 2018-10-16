import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, of, EMPTY } from "rxjs";
import { Todo, TodoService } from "./todo.service";
import { take, mergeMap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TodoResolverService implements Resolve<Todo[]> {
    constructor(private service: TodoService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Todo[]> {
        const observable = route.data.class === 'all' ? 
            this.service.getAllTodos():
            route.data.class === 'today' ?
            this.service.getAllTodayTodos():
            this.service.getAllWeekTodos();
        return observable.pipe(
            take(1),
            mergeMap(todos => {
                return of(todos || []);
            })
        );
    }
}
