import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let NewCategoryComponent = class NewCategoryComponent {
    constructor(categoryService, router) {
        this.categoryService = categoryService;
        this.router = router;
        this.fetching = false;
        this.error = null;
    }
    onSubmit() {
        this.fetching = true;
        this.categoryService.addCategory(this.form.value.name, this.form.value.color).subscribe((id) => {
            this.fetching = false;
            this.error = null;
            this.router.navigate(['/dashboard', 'categories'], { queryParams: { new: id } });
        }, (error) => {
            this.fetching = false;
            this.error = error.error.message;
        });
    }
};
__decorate([
    ViewChild('form', { static: false })
], NewCategoryComponent.prototype, "form", void 0);
NewCategoryComponent = __decorate([
    Component({
        selector: 'app-new-category',
        templateUrl: './new-category.component.html',
        styleUrls: ['./new-category.component.css']
    })
], NewCategoryComponent);
export { NewCategoryComponent };
//# sourceMappingURL=new-category.component.js.map