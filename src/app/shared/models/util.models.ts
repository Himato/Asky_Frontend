import { ViewUser } from './user.model';

export class Category {
  id: number;
  name: string;
  uri: string;
  color: string;
}

export class ViewCategory {
  id: number;
  name: string;
  color: string;
}

export class AdminCategory {
  id: number;
  name: string;
  color: string;
  numberOfTopics: number;
}

export class Reply {
  id: number;
  content: string;
  createdAt: Date;
  user: ViewUser;
  commentId: number;
}

export class Comment {
  id: number;
  content: string;
  user: ViewUser;
  createdAt: Date;
  numberOfUpVotes: number;
  numberOfDownVotes: number;
  replies: Reply[];
  isUpVoted?: boolean;
}

export class UserTopic {
  id: number;
  uri: string;
  title: string;
  content: string;
  categoryId: number;
}

export class Topic {
  id: number;
  title: string;
  content: string;
  uri: string;
  category: ViewCategory;
  user: ViewUser;
  createdAt: Date;
  numberOfUpVotes: number;
  numberOfDownVotes: number;
  comments: Comment[];
  isUpVoted?: boolean;
  isBookmarked: boolean;
}

export class TopicResult {
  uri: string;
  title: string;
  category: ViewCategory;
  user: ViewUser;
  numberOfComments: number;
  numberOfViews: number;
  createdAt: Date;
}

export class Notification {
  id: number;
  type: NotificationType;
  sender: ViewUser;
  createdAt: Date;
  uri: string;
  title: string;
  topicId: number;
  isRead: boolean;
  others?: number;
  commentId?: number;
  newId?: number;
}

export enum NotificationType {
  UpVote,
  DownVote,
  Comment,
  CommentUpVote,
  CommentDownVote,
  Reply
}
