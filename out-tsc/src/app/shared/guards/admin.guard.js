import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
let AdminGuard = class AdminGuard {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    canActivate(route, router) {
        return this.userService.user.pipe(take(1), map((user) => {
            const isAuth = !!user;
            if (isAuth && user.role === 'admin') {
                return true;
            }
            return this.router.createUrlTree(['/notfound']);
        })
        // tap(isAuth => {
        //   if (!isAuth) {
        //     this.router.navigate(['/auth']);
        //   }
        // })
        );
    }
};
AdminGuard = __decorate([
    Injectable({ providedIn: 'root' })
], AdminGuard);
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map