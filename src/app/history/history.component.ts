import { UserService } from './../shared/services/user.service';
import { TopicResult } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  topics: TopicResult[];
  fetching = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getHistory().subscribe((topics: TopicResult[]) => {
      this.topics = topics;
      this.fetching = false;
    });
  }

}
