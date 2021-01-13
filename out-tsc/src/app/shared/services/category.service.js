import { __decorate } from "tslib";
import { BehaviorSubject } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let CategoryService = class CategoryService {
    constructor(http) {
        this.http = http;
        this.categories = new BehaviorSubject(null);
        this.url = environment.url + 'categories/';
    }
    getCategories() {
        return this.http.get(this.url)
            .pipe(tap((response) => {
            this.categories.next(response);
        }));
    }
    getAdminCategories() {
        return this.http.get(this.url + 'admin');
    }
    getCategory(id) {
        return this.http.get(this.url + 'admin?id=' + id);
    }
    addCategory(name, color) {
        return this.http
            .post(this.url + 'admin', { name, color })
            .pipe(map((category) => {
            this.categories.pipe(take(1)).subscribe((categories) => {
                categories.push(category);
                this.categories.next(categories);
            });
            return category.id;
        }));
    }
    updateCategory(id, name, color) {
        return this.http
            .put(this.url + 'admin?id=' + id, { name, color })
            .pipe(tap((response) => {
            this.categories.pipe(take(1)).subscribe((categories) => {
                const category = categories.find(c => c.id === id);
                category.name = response.name;
                category.uri = response.uri;
                category.color = response.color;
                this.categories.next(categories);
            });
        }));
    }
    deleteCategory(id) {
        return this.http.delete(this.url + 'admin?id=' + id);
    }
};
CategoryService = __decorate([
    Injectable({ providedIn: 'root' })
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map