import { __decorate } from "tslib";
import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
let DashboardComponent = class DashboardComponent {
    constructor(userService, activatedRoute) {
        this.userService = userService;
        this.activatedRoute = activatedRoute;
        this.url = environment.baseUrl + 'Images/';
        this.fetching = true;
    }
    ngOnInit() {
        this.id = +this.activatedRoute.snapshot.queryParams.new;
        this.userService.getUsers().subscribe((users) => {
            this.users = users;
            this.fetching = false;
        }, () => {
            this.fetching = false;
        });
    }
};
DashboardComponent = __decorate([
    Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css']
    })
], DashboardComponent);
export { DashboardComponent };
//# sourceMappingURL=dashboard.component.js.map