import { TopicResult } from './../models/util.models';
import { AdminUser, Profile, ViewProfile } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  user = new BehaviorSubject<User>(null);
  url = environment.url + 'account/';
  usersUrl = environment.url + 'users/';
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUsers(): Observable<AdminUser[]> {
    return this.http.get<AdminUser[]>(environment.url + 'admin/users');
  }

  register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<string> {
    return this.http
      .post(this.url + 'register', {
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        })
      );
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post(this.url + 'login', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        }),
        catchError(err => {
          if (err.status === 401) {
            err.error = { message: 'Invalid login attempt' };
          }

          return throwError(err);
        })
      );
  }

  autoLogin(): void {
    const token = localStorage.getItem('userToken');

    if (!token) {
      return;
    }

    this.authenticate(token);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.router.navigate(['/login']);
    localStorage.removeItem('userToken');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.user.next(null);
  }

  private authenticate(token: string): void {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    if (isExpired) {
      return;
    }

    const user = new User(
      decodedToken.nameIdentifier,
      decodedToken.email,
      decodedToken.name,
      decodedToken.givenName,
      decodedToken.uri,
      typeof (decodedToken.Role) !== 'undefined' ?
        decodedToken.Role.toLowerCase() : null,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
    localStorage.setItem('userToken', token);
  }

  forgetPassword(email: string): Observable<boolean> {
    return this.http.post(this.url + 'forgetPassword', { email }).pipe(
      map(() => {
        return true;
      })
    );
  }

  resetPassword(
    token: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<string> {
    return this.http
      .post(this.url + 'resetPassword', {
        token,
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        })
      );
  }

  updateProfile(
    firstName: string,
    lastName: string,
    email: string,
    about: string
  ): Observable<string> {
    return this.http
      .put(this.url + 'updateProfile', { firstName, lastName, email, about })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        }));
  }

  updateImage(image: File): Observable<string> {
    const form = new FormData();
    form.append('image', image);

    return this.http
      .put(this.url + 'updateImage', form)
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        }));
  }

  updatePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<string> {
    return this.http.put(this.url + 'updatePassword', {
      currentPassword,
      newPassword,
      confirmPassword,
    })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        }));
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.url + 'profile');
  }

  getUserProfile(username: string): Observable<ViewProfile> {
    return this.http.get<ViewProfile>(this.usersUrl + 'profile?username=' + username);
  }

  getBookmarks(): Observable<TopicResult[]> {
    return this.http.get<TopicResult[]>(this.usersUrl + 'bookmarks');
  }

  getUpVotes(): Observable<TopicResult[]> {
    return this.http.get<TopicResult[]>(this.usersUrl + 'upvotes');
  }

  getDownVotes(): Observable<TopicResult[]> {
    return this.http.get<TopicResult[]>(this.usersUrl + 'downvotes');
  }

  getHistory(): Observable<TopicResult[]> {
    return this.http.get<TopicResult[]>(this.usersUrl + 'history');
  }
}
