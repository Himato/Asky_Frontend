import { Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  fetching = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.fetching = true;

    this.userService.resetPassword(
      this.form.value.token,
      this.form.value.email,
      this.form.value.password,
      this.form.value.confirmPassword,
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
