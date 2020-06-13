import { environment } from './../../environments/environment';
import { TopicResult } from './../shared/models/util.models';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topics-list',
  templateUrl: './topics-list.component.html',
  styleUrls: ['./topics-list.component.css']
})
export class TopicsListComponent {
  @Input() topics: TopicResult[];
  @Input() limit: number;
  @Input() offset: number;
  @Output() limitChange = new EventEmitter<number>();
  url = environment.baseUrl + 'Images/';

  constructor() { }

  onNext() {
    this.limitChange.next(this.limit + this.offset);
  }

  onPrevious() {
    this.limitChange.next(this.limit - this.offset);
  }

}
