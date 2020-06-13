import { ServiceTermsComponent } from './service-terms/service-terms.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { PolicyComponent } from './policy/policy.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NonAuthGuard } from './shared/guards/non-auth.guard';
import { SaveChangesGuard } from './shared/guards/save-changes.guard';
import { HistoryComponent } from './history/history.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { DownVotesComponent } from './down-votes/down-votes.component';
import { UpVotesComponent } from './up-votes/up-votes.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { TopicComponent } from './topic/topic.component';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OuterComponent } from './outer/outer.component';
import { BaseComponent } from './base/base.component';
import { CategoriesResolverService } from './shared/resolvers/categories-resolver.service';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    resolve: [CategoriesResolverService],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 't/:uri', component: TopicComponent },
      { path: 'users/:username', component: ProfileComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'guidelines', component: GuidelinesComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'service', component: ServiceTermsComponent },
      { path: 'notfound', component: NotFoundComponent },
      {
        path: '',
        canActivate: [AuthGuard],
        children: [
          { path: 'create', component: CreateTopicComponent, canDeactivate: [SaveChangesGuard] },
          { path: 'edit/:id', component: CreateTopicComponent, canDeactivate: [SaveChangesGuard] },
          { path: 'bookmarks', component: BookmarksComponent },
          { path: 'up-votes', component: UpVotesComponent },
          { path: 'down-votes', component: DownVotesComponent },
          { path: 'history', component: HistoryComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'settings', component: SettingsComponent },
        ]
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AdminGuard]
      }
    ]
  },
  {
    path: '',
    component: OuterComponent,
    canActivate: [NonAuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  },
  { path: '**', component: BaseComponent, children: [{ path: '**', component: NotFoundComponent }] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
