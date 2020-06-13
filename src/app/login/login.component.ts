import { Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  fetching = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.fetching = true;

    this.userService.login(
      this.form.value.email,
      this.form.value.password,
    ).subscribe(() => {
      this.fetching = false;
      this.error = null;
      this.router.navigate(['/']);
    }, (error: any) => {
      this.fetching = false;
      this.error = error.error.message;
    });
  }
}
