import { UserService } from './../shared/services/user.service';
import { TopicResult } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-down-votes',
  templateUrl: './down-votes.component.html',
  styleUrls: ['./down-votes.component.css']
})
export class DownVotesComponent implements OnInit {
  topics: TopicResult[];
  fetching = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDownVotes().subscribe((topics: TopicResult[]) => {
      this.topics = topics;
      this.fetching = false;
    });
  }

}
