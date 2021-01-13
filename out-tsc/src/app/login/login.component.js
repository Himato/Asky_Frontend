import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.fetching = false;
        this.error = null;
    }
    onSubmit() {
        this.fetching = true;
        this.userService.login(this.form.value.email, this.form.value.password).subscribe(() => {
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
], LoginComponent.prototype, "form", void 0);
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map