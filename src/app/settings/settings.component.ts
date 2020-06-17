import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Profile, User } from './../shared/models/user.model';
import { Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profile: Profile;
  fetching = true;
  url = environment.baseUrl + 'Images/';

  // Image actions
  submittingImage = false;

  // Form actions
  @ViewChild('profileForm', { static: false }) profileForm: NgForm;
  @ViewChild('passwordForm', { static: false }) passwordForm: NgForm;
  submittingForm = false;
  formError: string = null;
  submittingPasswordForm = false;
  passwordFormError: string = null;

  // Alert actions
  danger: string = null;
  success: string = null;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((profile: Profile) => {
      this.profile = profile;
      this.fetching = false;
    }, () => {
      this.router.navigate(['/']);
    });
  }

  onSelectImage(files: FileList) {
    this.submittingImage = true;

    const image = files[0];

    if (/image\//.test(image.type)) {
      const length = image.size / 1024 / 1024;

      if (length > 25) {
        this.submittingImage = false;
        this.alertDanger('Image size cannot be larger than 25MB');
        return;
      }

      this.userService.updateImage(image).subscribe(() => {
        this.userService.user.pipe(take(1)).subscribe((user: User) => {
          this.profile.imageUri = user.uri;
          this.submittingImage = false;
          this.alertSuccess('Image has been updated successfully');
        });
      }, (error: any) => {
        this.submittingImage = false;
        this.alertDanger(error.error.message);
      });
    } else {
      this.submittingImage = false;
      this.alertDanger('Unsupported Image Type');
    }
  }

  onSubmit() {
    this.submittingForm = true;
    this.userService.updateProfile(
      this.profileForm.value.firstName,
      this.profileForm.value.lastName,
      this.profileForm.value.email,
      this.profileForm.value.about,
    ).subscribe(() => {
      this.submittingForm = false;
      this.profileForm.reset(this.profile);
      this.alertSuccess('Profile has been updated successfully');
    }, (error: any) => {
      this.submittingForm = false;
      this.formError = error.error.message;
    });
  }

  onPasswordSubmit() {
    this.submittingPasswordForm = true;
    this.userService.updatePassword(
      this.passwordForm.value.password,
      this.passwordForm.value.newPassword,
      this.passwordForm.value.confirmPassword,
    ).subscribe(() => {
      this.submittingPasswordForm = false;
      this.passwordForm.reset();
      this.alertSuccess('Credentials has been updated successfully');
    }, (error: any) => {
      this.submittingPasswordForm = false;
      this.passwordFormError = error.error.message;
    });
  }

  alertDanger(msg: string, timeout?: number) {
    this.danger = msg;
    setTimeout(() => {
      this.danger = null;
    }, !!timeout ? timeout : 3000);
  }

  alertSuccess(msg: string, timeout?: number) {
    this.success = msg;
    setTimeout(() => {
      this.success = null;
    }, !!timeout ? timeout : 3000);
  }

}
