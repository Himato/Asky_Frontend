import { __decorate } from "tslib";
import { Component } from '@angular/core';
let OuterComponent = class OuterComponent {
    constructor(router) {
        this.router = router;
        this.isRegister = this.router.url === '/register';
        this.router.events.subscribe((naviationEnd) => {
            this.isRegister = naviationEnd.url === '/register';
        });
    }
};
OuterComponent = __decorate([
    Component({
        selector: 'app-outer',
        templateUrl: './outer.component.html',
        styleUrls: ['./outer.component.css']
    })
], OuterComponent);
export { OuterComponent };
//# sourceMappingURL=outer.component.js.map