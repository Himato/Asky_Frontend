import { CreateTopicComponent } from './../../create-topic/create-topic.component';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SaveChangesGuard implements CanDeactivate<CreateTopicComponent> {
  canDeactivate(
    component: CreateTopicComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return !!component.canDeactivate ? component.canDeactivate() : true;
  }
}
