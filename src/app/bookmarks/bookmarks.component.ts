import { UserService } from './../shared/services/user.service';
import { TopicResult } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {
  topics: TopicResult[];
  fetching = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getBookmarks().subscribe((topics: TopicResult[]) => {
      this.topics = topics;
      this.fetching = false;
    });
  }

}
