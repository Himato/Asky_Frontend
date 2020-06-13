import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  @Input() width: number;
  w: string;
  h: string;

  constructor() { }

  ngOnInit() {
    if (!!this.width) {
      this.w = `${this.width}px`;
      this.h = `${this.width}px`;
    } else {
      this.w = '35px';
      this.h = '35px';
    }
  }
}
