import { __decorate } from "tslib";
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
import { RouterModule } from '@angular/router';
const routes = [
    {
        path: '',
        component: BaseComponent,
        resolve: [CategoriesResolverService],
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'create', component: CreateTopicComponent },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [AdminGuard]
            },
        ]
    },
    {
        path: '',
        component: OuterComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'forget-password', component: ForgetPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
        ]
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map