import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let RegisterComponent = class RegisterComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.fetching = false;
        this.error = null;
    }
    onSubmit() {
        this.fetching = true;
        this.userService.register(this.form.value.username, this.form.value.firstName, this.form.value.lastName, this.form.value.email, this.form.value.password, this.form.value.confirmPassword).subscribe(() => {
            this.fetching = false;
            this.error = null;
            this.router.navigate(['/']);
        }, (error) => {
            this.fetching = false;
            this.error = error.error.message;
        });
    }
};
__decorate([
    ViewChild('form', { static: false })
], RegisterComponent.prototype, "form", void 0);
RegisterComponent = __decorate([
    Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map