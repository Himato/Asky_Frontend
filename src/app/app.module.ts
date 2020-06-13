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
import { TopicComponent } from './topic/topic.component';
import { TopicsListComponent } from './topics-list/topics-list.component';
import { HistoryComponent } from './history/history.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { UpVotesComponent } from './up-votes/up-votes.component';
import { DownVotesComponent } from './down-votes/down-votes.component';
import { SettingsComponent } from './settings/settings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PolicyComponent } from './policy/policy.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { ServiceTermsComponent } from './service-terms/service-terms.component';

@NgModule({
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
    TopicComponent,
    TopicsListComponent,
    HistoryComponent,
    BookmarksComponent,
    UpVotesComponent,
    DownVotesComponent,
    SettingsComponent,
    NotFoundComponent,
    AboutComponent,
    ContactComponent,
    PolicyComponent,
    GuidelinesComponent,
    ServiceTermsComponent,
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
export class AppModule { }
