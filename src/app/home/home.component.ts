import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService } from './../shared/services/category.service';
import { TopicService } from './../shared/services/topic.service';
import { Category, TopicResult } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[];
  topics: TopicResult[];
  fetching: boolean;
  categoryName: string = null;
  filters = {
    query: null,
    offset: 25,
    limit: 0,
    categoryId: null,
    latest: null,
    unread: null,
    popular: null,
    topVotes: null
  };

  constructor(
    private categoryService: CategoryService,
    private topicService: TopicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryService.categories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.filters.latest = true;
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      if (Object.keys(queryParams).length !== 0) {
        this.resetFilters();
      } else {
        this.getTopics();
        return;
      }

      if (!!queryParams.q) {
        this.filters.query = queryParams.q;
      }

      if (!!queryParams.c) {
        const category = this.categories.find(c => c.uri === queryParams.c);
        this.filters.categoryId = !!category ? category.id : null;
      }

      if (!!queryParams.unread) {
        this.filters.unread = true;
      } else if (!!queryParams.voted) {
        this.filters.topVotes = true;
      } else if (!!queryParams.popular) {
        this.filters.popular = true;
      } else {
        this.filters.latest = true;
      }

      this.router.navigate([], {
        queryParams: {
          c: null,
          q: null,
          latest: null,
          unread: null,
          voted: null,
          popular: null,
        },
        queryParamsHandling: 'merge'
      });
    });
  }

  filterByCategories(categoryId: number) {
    this.resetFilters();
    this.filters.latest = true;
    this.filters.categoryId = categoryId;
    this.categoryName = this.categories.find(c => c.id === categoryId).name;
    this.getTopics();
  }

  filterByLatest() {
    this.resetFilters();
    this.filters.latest = true;
    this.getTopics();
  }

  filterByUnread() {
    this.resetFilters();
    this.filters.unread = true;
    this.getTopics();
  }

  filterByVoted() {
    this.resetFilters();
    this.filters.topVotes = true;
    this.getTopics();
  }

  filterByPopular() {
    this.resetFilters();
    this.filters.popular = true;
    this.getTopics();
  }

  filterByLimit(value: number) {
    this.filters.limit = value;
    this.getTopics();
  }

  resetFilters() {
    this.filters.query = this.filters.query;
    this.filters.offset = 25;
    this.filters.limit = 0;
    this.filters.categoryId = this.filters.categoryId;
    this.filters.latest = null;
    this.filters.unread = null;
    this.filters.topVotes = null;
    this.filters.popular = null;
  }

  getTopics() {
    this.fetching = true;
    this.topicService.getTopics(
      this.filters.query,
      this.filters.offset,
      this.filters.limit,
      this.filters.categoryId,
      this.filters.latest,
      this.filters.unread,
      this.filters.popular,
      this.filters.topVotes
    ).subscribe((topics: TopicResult[]) => {
      this.topics = topics;
      this.fetching = false;
    });
  }

  onCancelQuery() {
    this.filters.query = null;
    this.getTopics();
  }

  onCancelCategories() {
    this.filters.categoryId = null;
    this.categoryName = null;
    this.getTopics();
  }
}
