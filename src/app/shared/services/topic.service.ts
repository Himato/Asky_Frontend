import { Topic, TopicResult, UserTopic, Reply, Comment } from './../models/util.models';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TopicService {
  url = environment.url + 'topics/';
  update = new Subject<any>();
  private connection: signalR.HubConnection;
  private disconnected = false;

  constructor(private http: HttpClient) { }

  async connect(topicId: number) {
    if (!!this.connection) {
      this.disconnected = true;
      await this.connection.stop();
    }

    this.connection
      = new signalR.HubConnectionBuilder()
        .withUrl(environment.baseUrl + 'topicsHub',
          { accessTokenFactory: () => localStorage.getItem('userToken') })
        .configureLogging(signalR.LogLevel.None)
        .build();

    this.disconnected = false;

    this.connection.onclose(async () => {
      if (!this.disconnected) {
        await this.startConnection(topicId);
      }
    });

    await this.startConnection(topicId);
  }

  private async startConnection(topicId: number) {
    try {
      await this.connection.start();

      this.connection.on('ReceiveComment', (comment: Comment) => {
        this.update.next(comment);
      });

      this.connection.on('ReceiveReply', (reply: Reply) => {
        this.update.next(reply);
      });

      this.connection.invoke('connect', topicId);
    } catch (err) {
      setTimeout(() => this.startConnection(topicId), 5000);
    }
  }

  async disconnect() {
    this.disconnected = true;
    if (!!this.connection) {
      await this.connection.stop();
    }
  }

  getTopics(
    query?: string,
    offset?: number,
    limit?: number,
    categoryId?: number,
    latest?: boolean,
    unread?: boolean,
    popular?: boolean,
    topVotes?: boolean
  ): Observable<TopicResult[]> {
    let params = new HttpParams();

    if (!!query) {
      params = params.append('query', `title co ${query}`);
    }

    if (!!offset) {
      params = params.append('offset', offset.toString());
    }

    if (!!limit) {
      params = params.append('limit', limit.toString());
    }

    if (!!categoryId) {
      params = params.append('categoryId', categoryId.toString());
    }

    if (!!latest) {
      params = params.append('latest', latest.toString());
    } else if (!!unread) {
      params = params.append('unread', unread.toString());
    } else if (!!popular) {
      params = params.append('popular', popular.toString());
    } else if (!!topVotes) {
      params = params.append('topVotes', topVotes.toString());
    }

    return this.http.get<TopicResult[]>(this.url, { params });
  }

  getViewTopic(uri: string): Observable<Topic> {
    return this.http.get<Topic>(this.url + 'view?uri=' + uri);
  }

  getUserTopic(id: number): Observable<UserTopic> {
    return this.http.get<UserTopic>(this.url + 'user?id=' + id);
  }

  addTopic(title: string, content: string, categoryId: number):
    Observable<string> {
    return this.http.post(this.url + 'user', {
      title,
      content,
      categoryId
    }).pipe(map((response: any) => {
      return response.value;
    }));
  }

  updateTopic(id: number, content: string, categoryId: number): Observable<any> {
    return this.http.put(this.url + 'user?id=' + id, {
      content,
      categoryId
    });
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete(this.url + 'user?id=' + id);
  }

  voteUp(topicId: number): Observable<any> {
    return this.http.put(this.url + 'voteup?id=' + topicId, {});
  }

  voteDown(topicId: number): Observable<any> {
    return this.http.put(this.url + 'votedown?id=' + topicId, {});
  }

  bookmark(topicId: number): Observable<any> {
    return this.http.put(this.url + 'bookmark?id=' + topicId, {});
  }

  addComment(topicId: number, content: string): Observable<Comment> {
    return this.http.post<Comment>(this.url + 'comments?topicId=' + topicId, {
      content
    });
  }

  updateComment(id: number, content: string): Observable<any> {
    return this.http.put(this.url + 'comments?id=' + id, {
      content
    });
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(this.url + 'comments?id=' + id);
  }

  commentVoteUp(commentId: number): Observable<any> {
    return this.http.put(this.url + 'comments/voteup?id=' + commentId, {});
  }

  commentVoteDown(commentId: number): Observable<any> {
    return this.http.put(this.url + 'comments/votedown?id=' + commentId, {});
  }

  addReply(commentId: number, content: string): Observable<Reply> {
    return this.http
      .post<Reply>(this.url + 'comments/replies?commentId=' + commentId, {
        content
      });
  }

  updateReply(id: number, content: string): Observable<any> {
    return this.http.put(this.url + 'comments/replies?id=' + id, {
      content
    });
  }

  deleteReply(id: number): Observable<any> {
    return this.http.delete(this.url + 'comments/replies?id=' + id);
  }
}
