import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CategoriesListComponent = class CategoriesListComponent {
    constructor(categoryService, activatedRoute) {
        this.categoryService = categoryService;
        this.activatedRoute = activatedRoute;
        this.fetching = true;
    }
    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.queryParams.new;
        this.categoryService.getAdminCategories().subscribe((categories) => {
            this.categories = categories;
            this.fetching = false;
        }, () => {
            this.fetching = false;
        });
    }
};
CategoriesListComponent = __decorate([
    Component({
        selector: 'app-categories-list',
        templateUrl: './categories-list.component.html',
        styleUrls: ['./categories-list.component.css']
    })
], CategoriesListComponent);
export { CategoriesListComponent };
//# sourceMappingURL=categories-list.component.js.map