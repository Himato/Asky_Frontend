import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CategoriesComponent = class CategoriesComponent {
    constructor(router) {
        this.router = router;
        this.isMain = this.router.url === '/dashboard/categories';
        this.router.events.subscribe((navigationEnd) => {
            this.isMain = navigationEnd.url === '/dashboard/categories';
        });
    }
};
CategoriesComponent = __decorate([
    Component({
        selector: 'app-categories',
        templateUrl: './categories.component.html',
        styleUrls: ['./categories.component.css']
    })
], CategoriesComponent);
export { CategoriesComponent };
//# sourceMappingURL=categories.component.js.map