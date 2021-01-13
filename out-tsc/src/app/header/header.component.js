import { __decorate } from "tslib";
import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
let HeaderComponent = class HeaderComponent {
    constructor(userService, categoryService) {
        this.userService = userService;
        this.categoryService = categoryService;
        this.user = null;
        this.isAdmin = false;
        this.url = environment.baseUrl + 'Images/';
        this.isHeaderSearch = false;
    }
    ngOnInit() {
        this.userService.user.subscribe((user) => {
            this.user = user;
            if (!!user && !!user.role && user.role === 'admin') {
                this.isAdmin = true;
            }
        });
        this.categoryService.categories.subscribe((categories) => {
            this.categories = categories;
        });
    }
    onLogout() {
        this.userService.logout();
    }
    onOpenSearch() {
        this.isHeaderSearch = true;
    }
    onCloseSearch() {
        this.isHeaderSearch = false;
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map