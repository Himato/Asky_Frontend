import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { User } from './../shared/models/user.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { TopicService } from './../shared/services/topic.service';
import { environment } from './../../environments/environment';
import { Topic, Comment, Reply } from './../shared/models/util.models';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form: NgForm;
  topic: Topic;
  user: User;
  url = environment.baseUrl + 'Images/';
  uri: string = null;
  fetching = true;

  // messages
  message: string = null;
  success: string = null;
  danger: string = null;

  // submitting comment & reply data
  loaded: Comment = null;
  editing: Comment | Reply | any = null;
  submitting = false;
  submittingError: string = null;

  // To be cleared each time uri changes
  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private topicService: TopicService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.uri = params.uri;

      for (const subscription of this.subscriptions) {
        subscription.unsubscribe();
      }

      if (!!this.uri) {
        this.loadTopic();
      } else {
        this.router.navigate(['/notfound']);
      }
    });

    this.userService.user.pipe(take(1)).subscribe((user: User) => {
      this.user = user;
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      // To be ignored the first time the uri is generated to ensure that the new topic is loaded
      if (!!this.topic && this.topic.uri === this.activatedRoute.snapshot.params.uri) {
        this.highlightWithValidation(params);
      } else {
        return;
      }
    });
  }

  async ngOnDestroy() {
    await this.topicService.disconnect();
  }

  loadTopic() {
    this.subscriptions.push(this.topicService.getViewTopic(this.uri).subscribe(async (topic: Topic) => {
      this.fetching = false;
      this.topic = topic;

      // Highlighting for the first time coz queryParams subscription is ignored
      this.highlightWithValidation(this.activatedRoute.snapshot.queryParams);

      // connecting real-time comments & replies
      await this.topicService.connect(this.topic.id);

      this.subscriptions.push(this.topicService.update.subscribe((update: Comment | Reply) => {
        if (!!this.user && update.user.username === this.user.username) {
          return;
        }

        if (!(update as Comment).replies) {
          const reply = update as Reply;
          this.topic.comments.find(c => c.id === reply.commentId)
            .replies.push(reply);
        } else {
          this.topic.comments.push(update as Comment);
        }
      }));
    }, () => {
      this.router.navigate(['/notfound']);
    }));
  }

  onSubmit() {
    this.submitting = true;
    if (!!this.loaded) {
      this.topicService.addReply(this.loaded.id, this.form.value.content).subscribe((reply: Reply) => {
        this.submitting = false;
        this.loaded.replies.push(reply);
        this.loaded = null;
        this.form.reset();
        this.highlight(reply.id, true);
      }, (error: any) => {
        this.submitting = false;
        this.submittingError = error.error.message;
      });
    } else if (!!this.editing) {
      let obs: Observable<any>;
      const isReply = !(this.editing as Comment).replies;

      if (isReply) {
        obs = this.topicService.updateReply(this.editing.id, this.form.value.content);
      } else {
        obs = this.topicService.updateComment(this.editing.id, this.form.value.content);
      }

      obs.subscribe(() => {
        this.submitting = false;
        this.editing.content = this.form.value.content;
        this.form.reset();
        this.highlight(this.editing.id, isReply);
        this.editing = null;
      }, (error: any) => {
        this.submitting = false;
        this.submittingError = error.error.message;
      });
    } else {
      this.topicService.addComment(this.topic.id, this.form.value.content).subscribe((comment: Comment) => {
        this.submitting = false;
        this.submittingError = null;
        this.form.reset();
        this.topic.comments.push(comment);
      }, (error: any) => {
        this.submitting = false;
        this.submittingError = error.error.message;
      });
    }
  }

  onCancel() {
    this.editing = null;
  }

  onAddComment() {
    if (!this.user) {
      this.alertDanger('Login to be able to add comments');
      return;
    }

    this.loaded = null;
    this.editing = null;
    document.querySelector('#comment').scrollIntoView();
  }

  onAddReply(commentId: number) {
    if (!this.user) {
      this.alertDanger('Login to be able to add replies');
      return;
    }

    this.loaded = this.topic.comments.find(c => c.id === commentId);
    this.editing = null;
    document.querySelector('#comment').scrollIntoView();
  }

  onDeleteComment(index: number, commentId: number) {
    const confirmed = confirm('Are you sure that you want to delete this comment permenantly?');

    if (confirmed) {
      this.topic.comments.splice(index, 1);
      this.topicService.deleteComment(commentId).subscribe(() => {
      }, (error: any) => {
        this.alertDanger(error.error.message);
      });
    }
  }

  onDeleteReply(comment: Comment, index: number, replyId: number) {
    const confirmed = confirm('Are you sure that you want to delete this reply permenantly?');

    if (confirmed) {
      comment.replies.splice(index, 1);
      this.topicService.deleteReply(replyId).subscribe(() => {
      }, (error: any) => {
        this.alertDanger(error.error.message);
      });
    }
  }

  onEditComment(comment: Comment) {
    this.loaded = null;
    this.editing = comment;
    document.querySelector('#comment').scrollIntoView();
  }

  onEditReply(reply: Reply) {
    this.loaded = null;
    this.editing = reply;
    document.querySelector('#comment').scrollIntoView();
  }

  travel(commentId: number) {
    document.querySelector('#comment-' + commentId).scrollIntoView();
  }

  removeLoaded() {
    this.loaded = null;
  }

  highlight(id: number, isReply: boolean) {
    let ele: Element = null;
    let count = 0;

    // using interval to make sure that the element exists within 1 sec
    const interval = setInterval(() => {
      ele = document.querySelector(`#${isReply ? 'reply' : 'comment'}-${id}`);
      if (!!ele) {
        ele.classList.add('white-highlight');
        ele.scrollIntoView();
        clearInterval(interval);
      }

      if (count >= 10) {
        clearInterval(interval);
      }
      count++;
    }, 100);
  }

  highlightWithValidation(params: Params) {
    if (!!params.commentId) {
      if (this.topic.comments.findIndex(c => c.id === +params.commentId) === -1) {
        this.alertDanger('Comment doesn\'t exist or has been deleted');
      } else {
        this.highlight(params.commentId, false);
      }
    } else if (!!params.replyId) {
      let found = false;
      for (const comment of this.topic.comments) {
        if (comment.replies.findIndex(r => r.id === +params.replyId) !== -1) {
          found = true;
          break;
        }
      }

      if (!found) {
        this.alertDanger('Reply doesn\'t exist or has been deleted');
      } else {
        this.highlight(params.replyId, true);
      }
    }
  }

  onVoteUp() {
    if (!this.user) {
      this.alertDanger('Login to be able to vote');
      return;
    }

    this.toggleVoteUp(this.topic);

    this.topicService.voteUp(this.topic.id).subscribe(() => {
    }, (error: any) => {
      this.toggleVoteUp(this.topic);
      this.alertDanger(error.error.message);
    });
  }

  onVoteDown() {
    if (!this.user) {
      this.alertDanger('Login to be able to vote');
      return;
    }

    this.toggleVoteDown(this.topic);

    this.topicService.voteDown(this.topic.id).subscribe(() => {
    }, (error: any) => {
      this.toggleVoteDown(this.topic);
      this.alertDanger(error.error.message);
    });
  }

  onCommentVoteUp(comment: Comment) {
    if (!this.user) {
      this.alertDanger('Login to be able to vote');
      return;
    }

    this.toggleVoteUp(comment);

    this.topicService.commentVoteUp(comment.id).subscribe(() => {
    }, (error: any) => {
      this.toggleVoteUp(comment);
      this.alertDanger(error.error.message);
    });
  }

  onCommentVoteDown(comment: Comment) {
    if (!this.user) {
      this.alertDanger('Login to be able to vote');
      return;
    }

    this.toggleVoteDown(comment);

    this.topicService.commentVoteDown(comment.id).subscribe(() => {
    }, (error: any) => {
      this.toggleVoteDown(comment);
      this.alertDanger(error.error.message);
    });
  }

  toggleVoteUp(obj: Comment | Topic) {
    if (obj.isUpVoted) {
      obj.numberOfUpVotes--;
      obj.isUpVoted = null;
    } else {
      if (obj.isUpVoted !== null && !obj.isUpVoted) {
        obj.numberOfDownVotes--;
      }

      obj.numberOfUpVotes++;
      obj.isUpVoted = true;
    }
  }

  toggleVoteDown(obj: any) {
    if (obj.isUpVoted !== null && !obj.isUpVoted) {
      obj.numberOfDownVotes--;
      obj.isUpVoted = null;
    } else {
      if (obj.isUpVoted) {
        obj.numberOfUpVotes--;
      }

      obj.numberOfDownVotes++;
      obj.isUpVoted = false;
    }
    // obj.isUpVoted = obj.isUpVoted === true || obj.isUpVoted === null ? false : null;
  }

  onCopyLink() {
    const url = window.location.protocol + '//' + window.location.host + this.router.url;
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.alertSuccess('Link Copied!');
  }

  onBookmark() {
    if (!this.user) {
      this.alertDanger('Login to be add it to your bookmarks');
      return;
    }

    if (this.topic.isBookmarked) {
      this.topic.isBookmarked = false;
      this.alert('Removed from Bookmark');
    } else {
      this.topic.isBookmarked = true;
      this.alertSuccess('Added to Bookmark');
    }

    this.topicService.bookmark(this.topic.id).subscribe(() => {
    }, (error: any) => {
      this.alertDanger(error.error.message);
      this.topic.isBookmarked = false;
    });
  }

  alert(msg: string, timeout?: number) {
    this.message = msg;
    setTimeout(() => {
      this.message = null;
    }, !!timeout ? timeout : 3000);
  }

  alertDanger(msg: string, timeout?: number) {
    this.danger = msg;
    setTimeout(() => {
      this.danger = null;
    }, !!timeout ? timeout : 3000);
  }

  alertSuccess(msg: string, timeout?: number) {
    this.success = msg;
    setTimeout(() => {
      this.success = null;
    }, !!timeout ? timeout : 3000);
  }

  onDeleteTopic() {
    const confirmed = confirm('Are you sure that you want to delete this topic permenantly?');

    if (confirmed) {
      this.topicService.deleteTopic(this.topic.id).subscribe(() => {
        this.router.navigate(['/']);
      }, (error: any) => {
        this.alertDanger(error.error.message);
      });
    }
  }

  isComment(obj: Comment | Reply): obj is Comment {
    return !!(obj as Comment).replies;
  }
}
