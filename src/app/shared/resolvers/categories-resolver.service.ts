import { Observable } from 'rxjs';
import { CategoryService } from './../services/category.service';
import { Category } from './../models/util.models';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolverService implements Resolve<Category[]> {
  constructor(
    private categoriesService: CategoryService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let categories: Category[];

    this.categoriesService.getCategories().subscribe((response) => {
      categories = response;
    });

    return categories;
  }
}
