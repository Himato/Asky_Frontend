import { __decorate } from "tslib";
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesComponent } from './categories/categories.component';
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SharedModule,
            FormsModule,
            RouterModule.forChild([
                { path: '', component: DashboardComponent },
                {
                    path: 'categories',
                    component: CategoriesComponent,
                    children: [
                        { path: '', component: CategoriesListComponent },
                        { path: 'new', component: NewCategoryComponent },
                        { path: 'edit/:id', component: EditCategoryComponent },
                    ]
                }
            ]),
        ],
        declarations: [
            DashboardComponent,
            CategoriesListComponent,
            NewCategoryComponent,
            EditCategoryComponent,
            CategoriesComponent,
        ],
    })
], DashboardModule);
export { DashboardModule };
//# sourceMappingURL=dashboard.module.js.map