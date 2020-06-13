import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityPipe } from './pipes/activity.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    ActivityPipe,
  ],
  imports: [CommonModule],
  exports: [
    SpinnerComponent,
    CommonModule,
    ActivityPipe
  ],
  entryComponents: [],
  providers: [
    ActivityPipe
  ]
})
export class SharedModule { }
