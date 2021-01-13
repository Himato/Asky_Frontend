import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CategoriesResolverService = class CategoriesResolverService {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    resolve(route, state) {
        let categories;
        this.categoriesService.getCategories().subscribe((response) => {
            categories = response;
        });
        return categories;
    }
};
CategoriesResolverService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CategoriesResolverService);
export { CategoriesResolverService };
//# sourceMappingURL=categories-resolver.service.js.map