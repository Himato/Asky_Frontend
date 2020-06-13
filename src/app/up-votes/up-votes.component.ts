import { UserService } from './../shared/services/user.service';
import { TopicResult } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-votes',
  templateUrl: './up-votes.component.html',
  styleUrls: ['./up-votes.component.css']
})
export class UpVotesComponent implements OnInit {
  topics: TopicResult[];
  fetching = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUpVotes().subscribe((topics: TopicResult[]) => {
      this.topics = topics;
      this.fetching = false;
    });
  }

}
