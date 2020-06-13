import { Notification } from './../models/util.models';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as signalR from '@aspnet/signalr';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  url = environment.url + 'users/notifications/';
  notifications = new Subject<Notification>();
  private connection: signalR.HubConnection;
  private disconnected = false;

  constructor(private http: HttpClient) { }

  async connect() {
    this.connection
      = new signalR.HubConnectionBuilder()
        .withUrl(environment.baseUrl + 'notificationsHub',
          { accessTokenFactory: () => localStorage.getItem('userToken') })
        .configureLogging(signalR.LogLevel.None)
        .build();

    this.connection.onclose(async () => {
      if (!this.disconnected) {
        await this.startConnection();
      }
    });

    await this.startConnection();
  }

  private async startConnection() {
    try {
      await this.connection.start();

      this.connection.on('Notify', (notification: Notification) => {
        this.notifications.next(notification);
      });
    } catch (err) {
      setTimeout(() => this.startConnection(), 5000);
    }
  }

  async disconnect() {
    this.disconnected = true;
    if (!!this.connection) {
      await this.connection.stop();
    }
  }

  getNotifications(limit?: number): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(this.url +
        (limit !== null ? ('?limit=' + limit) : ''));
  }

  markAsRead(notificationId: number) {
    return this.http.put(this.url + '?notificationId=' + notificationId, {});
  }
}
