import { __decorate } from "tslib";
import { DashboardModule } from './dashboard/dashboard.module';
import { OuterComponent } from './outer/outer.component';
import { BaseComponent } from './base/base.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            BaseComponent,
            OuterComponent,
            HeaderComponent,
            FooterComponent,
            RegisterComponent,
            LoginComponent,
            ResetPasswordComponent,
            ForgetPasswordComponent,
            HomeComponent,
            ProfileComponent,
            CreateTopicComponent,
        ],
        imports: [
            BrowserModule,
            FormsModule,
            HttpClientModule,
            AppRoutingModule,
            SharedModule,
            DashboardModule
        ],
        providers: [
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true,
            },
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map