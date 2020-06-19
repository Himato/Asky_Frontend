import { TopicResult } from './util.models';

export class User {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public givenName: string,
    public uri: string,
    public role: string,
    private tokenCode: string,
    private tokenExpirationDate: Date
  ) { }

  get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.tokenCode;
  }
}

export class ViewUser {
  username: string;
  name: string;
  imageUri: string;
}

export class ViewProfile {
  name: string;
  imageUri: string;
  about: string;
  topics: TopicResult[];
}

export class Profile {
  firstName: string;
  lastName: string;
  email: string;
  imageUri: string;
  about: string;
}

export class AdminUser {
  name: string;
  username: string;
  email: string;
  createdAt: Date;
  imageUri: string;
  numberOfTopics: string;
  numberOfUpVotes: string;
  numberOfDownVotes: string;
}
