import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
let UserService = class UserService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.user = new BehaviorSubject(null);
        this.url = environment.url + 'account/';
    }
    getUsers() {
        return this.http.get(environment.url + 'admin/users');
    }
    register(username, firstName, lastName, email, password, confirmPassword) {
        return this.http
            .post(this.url + 'register', {
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        })
            .pipe(tap((response) => {
            this.authenticate(response.value);
        }), map((response) => {
            return response.value;
        }));
    }
    login(email, password) {
        return this.http
            .post(this.url + 'login', {
            email,
            password,
        })
            .pipe(tap((response) => {
            this.authenticate(response.value);
        }), map((response) => {
            return response.value;
        }), catchError(err => {
            if (err.status === 401) {
                err.error = { message: 'Invalid login attempt' };
            }
            return throwError(err);
        }));
    }
    autoLogin() {
        const token = localStorage.getItem('userToken');
        if (!token) {
            return;
        }
        this.authenticate(token);
    }
    autoLogout(expirationDuration) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }
    logout() {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userToken');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }
    authenticate(token) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const expirationDate = helper.getTokenExpirationDate(token);
        const isExpired = helper.isTokenExpired(token);
        if (isExpired) {
            return;
        }
        console.log(decodedToken);
        const user = new User(decodedToken.nameIdentifier, decodedToken.email, decodedToken.name, decodedToken.uri, typeof (decodedToken.Role) !== 'undefined' ?
            decodedToken.Role.toLowerCase() : null, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expirationDate.getTime() - new Date().getTime());
        localStorage.setItem('userToken', token);
    }
    forgetPassword(email) {
        return this.http.post(this.url + 'forgetPassword', { email }).pipe(map(() => {
            return true;
        }));
    }
    resetPassword(token, email, password, confirmPassword) {
        return this.http
            .post(this.url + 'resetPassword', {
            token,
            email,
            password,
            confirmPassword,
        })
            .pipe(tap((response) => {
            this.authenticate(response.value);
        }), map((response) => {
            return response.value;
        }));
    }
    updateProfile(firstName, lastName, email) {
        return this.http
            .put(this.url + 'updateProfile', { firstName, lastName, email })
            .pipe(tap((response) => {
            this.authenticate(response.value);
        }), map((response) => {
            return response.value;
        }));
    }
    updatePassword(currentPassword, newPassword, confirmPassword) {
        return this.http.put(this.url + 'updatePassword', {
            currentPassword,
            newPassword,
            confirmPassword,
        })
            .pipe(tap((response) => {
            this.authenticate(response.value);
        }), map((response) => {
            return response.value;
        }));
    }
};
UserService = __decorate([
    Injectable({ providedIn: 'root' })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map