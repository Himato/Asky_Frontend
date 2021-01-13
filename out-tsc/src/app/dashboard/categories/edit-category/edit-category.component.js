import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let EditCategoryComponent = class EditCategoryComponent {
    constructor(categoryService, activatedRoute, router) {
        this.categoryService = categoryService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.fetching = false;
        this.success = false;
        this.error = null;
    }
    ngOnInit() {
        const id = +this.activatedRoute.snapshot.params.id;
        this.categoryService.getCategory(id).subscribe((category) => {
            this.category = category;
        }, () => {
            this.router.navigate(['/dashboard', 'categories']);
        });
    }
    onSubmit() {
        this.fetching = true;
        this.success = false;
        this.categoryService.updateCategory(this.category.id, this.form.value.name, this.form.value.color).subscribe(() => {
            this.fetching = false;
            this.success = true;
            this.error = null;
        }, (error) => {
            this.fetching = false;
            this.success = false;
            this.error = error.error.message;
        });
    }
};
__decorate([
    ViewChild('form', { static: false })
], EditCategoryComponent.prototype, "form", void 0);
EditCategoryComponent = __decorate([
    Component({
        selector: 'app-edit-category',
        templateUrl: './edit-category.component.html',
        styleUrls: ['./edit-category.component.css']
    })
], EditCategoryComponent);
export { EditCategoryComponent };
//# sourceMappingURL=edit-category.component.js.map