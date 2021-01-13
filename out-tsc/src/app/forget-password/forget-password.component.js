import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
let ForgetPasswordComponent = class ForgetPasswordComponent {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
        this.fetching = false;
        this.error = null;
    }
    onSubmit() {
        this.fetching = true;
        this.userService.forgetPassword(this.form.value.email).subscribe(() => {
            this.fetching = false;
            this.error = null;
            this.router.navigate(['/reset-password']);
        }, (error) => {
            this.fetching = false;
            this.error = error.error.message;
        });
    }
};
__decorate([
    ViewChild('form', { static: false })
], ForgetPasswordComponent.prototype, "form", void 0);
ForgetPasswordComponent = __decorate([
    Component({
        selector: 'app-forget-password',
        templateUrl: './forget-password.component.html',
        styleUrls: ['./forget-password.component.css']
    })
], ForgetPasswordComponent);
export { ForgetPasswordComponent };
//# sourceMappingURL=forget-password.component.js.map