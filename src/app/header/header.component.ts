import { AppComponent } from './../app.component';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Category, Notification, NotificationType } from './../shared/models/util.models';
import { CategoryService } from './../shared/services/category.service';
import { environment } from './../../environments/environment';
import { UserService } from './../shared/services/user.service';
import { NotificationService } from './../shared/services/notification.service';
import { User } from './../shared/models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = AppComponent.title;

  user: User = null;
  categories: Category[];
  isAdmin = false;
  url = environment.baseUrl + 'Images/';
  isHeaderSearch = false;

  // notifications
  types = NotificationType;
  notifications: Notification[] = [];
  newNotifications: Notification[] = [];
  times = 0; // indicates the number of requests sent to get notifications
  numberOfUnread = 0;
  unreadNotification = new BehaviorSubject<number>(0);
  fetching: boolean;
  isMore = true; // indicates if there might be more notifications to load

  constructor(
    private titleService: Title,
    private userService: UserService,
    private categoryService: CategoryService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user: User) => {
      this.user = user;
      if (!!user && !!user.role && user.role === 'admin') {
        this.isAdmin = true;
      }
    });

    this.categoryService.categories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    if (!!this.user) {
      this.unreadNotification.subscribe((n: number) => {
        this.numberOfUnread = n;

        if (n !== 0) {
          this.titleService.setTitle(this.title + ` (${n})`);
        } else {
          this.titleService.setTitle(this.title);
        }
      });

      this.addNotifications();

      this.notificationService.connect();

      this.notificationService.notifications.subscribe((notification: Notification) => {
        this.newNotifications.unshift(notification);

        const index = this.findNotificationIndex(notification);
        if (index !== -1) {
          const duplicate = this.notifications[index];
          if (duplicate.sender.username !== notification.sender.username) {
            notification.others = !!duplicate.others ? duplicate.others + 1 : 1;
          }
          this.notifications.splice(index, 1);
          this.unreadNotification.next(this.unreadNotification.getValue() - 1);
        }

        this.notifications.unshift(notification);

        setTimeout(() => {
          this.newNotifications.shift();
        }, 5000);

        const audio = new Audio('./../../assets/audio/notify.mp3');
        audio.play();

        this.unreadNotification.next(this.unreadNotification.getValue() + 1);
      });
    }
  }

  async ngOnDestroy() {
    await this.notificationService.disconnect();
  }

  onLogout() {
    this.userService.logout();
  }

  onOpenSearch() {
    this.isHeaderSearch = true;
  }

  onCloseSearch() {
    this.isHeaderSearch = false;
  }

  onSearchChange(event: any) {
    if (event.keyCode === 13) {
      this.router.navigate(['/'], { queryParams: { q: event.target.value } });
      event.target.value = null;
    }
  }

  addNotifications() {
    this.fetching = true;
    const limit = this.times > 0 ? (this.times !== 1 ? this.notifications.length : 0) : null;
    this.notificationService.getNotifications(limit)
      .subscribe((notifications: Notification[]) => {
        if (notifications.length < 5) {
          if (this.times !== 0) {
            this.isMore = false;
          }
        } else {
          this.isMore = true;
        }

        // Adding unique notifications only and update others otherwise
        for (const notification of notifications) {
          const index = this.findNotificationIndex(notification);
          if (index !== -1) {
            const duplicate = this.notifications[index];
            if (duplicate.sender.username !== notification.sender.username) {
              duplicate.others = !!duplicate.others ? duplicate.others + 1 : 1;
            }
          } else {
            this.notifications.push(notification);
          }
        }
        this.unreadNotification.next(this.notifications.filter(n => !n.isRead).length);
        this.fetching = false;
        this.times++;
      });
  }

  navigate(notification: Notification) {
    if (!notification.isRead) {
      notification.isRead = true;
      this.unreadNotification.next(this.unreadNotification.getValue() - 1);

      this.notificationService.markAsRead(notification.id).subscribe(() => { }, () => {
        notification.isRead = false;
        this.unreadNotification.next(this.unreadNotification.getValue() + 1);
      });
    }

    const index = this.newNotifications.indexOf(notification);
    if (index !== -1) {
      this.newNotifications.splice(index, 1);
    }

    const queryParams: any = {};

    if (notification.type === NotificationType.CommentUpVote ||
      notification.type === NotificationType.CommentDownVote
    ) {
      queryParams.commentId = notification.commentId;
    } else if (notification.type === NotificationType.Comment) {
      queryParams.commentId = notification.newId;
    } else if (notification.type === NotificationType.Reply) {
      queryParams.replyId = notification.newId;
    }

    this.router.navigate(['/t', notification.uri], { queryParams });
  }

  findNotificationIndex(notification: Notification): number {
    return this.notifications
      .findIndex(n => n.type === notification.type &&
        n.topicId === notification.topicId &&
        n.commentId === notification.commentId
      );
  }
}
