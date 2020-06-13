import { Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  fetching = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    this.fetching = true;

    this.userService.forgetPassword(this.form.value.email).subscribe(() => {
      this.fetching = false;
      this.error = null;
      this.router.navigate(['/reset-password']);
    }, (error: any) => {
      this.fetching = false;
      this.error = error.error.message;
    });
  }
}
