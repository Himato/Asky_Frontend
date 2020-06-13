import { Category, AdminCategory } from './../models/util.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categories = new BehaviorSubject<Category[]>([]);
  url = environment.url + 'categories/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url)
      .pipe(tap((response: Category[]) => {
        this.categories.next(response);
      }));
  }

  getAdminCategories(): Observable<AdminCategory[]> {
    return this.http.get<AdminCategory[]>(this.url + 'admin');
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + 'admin?id=' + id);
  }

  addCategory(name: string, color: string): Observable<number> {
    return this.http
      .post(this.url + 'admin', { name, color })
      .pipe(map((category: Category) => {
        this.categories.next(this.categories.getValue().concat([category]));
        return category.id;
      }));
  }

  updateCategory(id: number, name: string, color: string) {
    return this.http
      .put(this.url + 'admin?id=' + id, { name, color })
      .pipe(tap((response: Category) => {
        const categories = this.categories.getValue();
        const category = categories.find(c => c.id === id);
        category.name = response.name;
        category.uri = response.uri;
        category.color = response.color;
        this.categories.next(categories);
      }));
  }

  deleteCategory(id: number) {
    return this.http.delete(this.url + 'admin?id=' + id);
  }
}
