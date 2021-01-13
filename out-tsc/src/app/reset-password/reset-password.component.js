import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let ResetPasswordComponent = class ResetPasswordComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.fetching = false;
        this.error = null;
    }
    onSubmit() {
        this.fetching = true;
        this.userService.resetPassword(this.form.value.token, this.form.value.email, this.form.value.password, this.form.value.confirmPassword).subscribe(() => {
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
], ResetPasswordComponent.prototype, "form", void 0);
ResetPasswordComponent = __decorate([
    Component({
        selector: 'app-reset-password',
        templateUrl: './reset-password.component.html',
        styleUrls: ['./reset-password.component.css']
    })
], ResetPasswordComponent);
export { ResetPasswordComponent };
//# sourceMappingURL=reset-password.component.js.map