import { __decorate } from "tslib";
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [
            SpinnerComponent,
        ],
        imports: [CommonModule],
        exports: [
            SpinnerComponent,
            CommonModule,
        ],
        entryComponents: [],
        providers: []
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map