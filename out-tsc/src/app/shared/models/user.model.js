export class User {
    constructor(id, email, username, uri, role, tokenCode, tokenExpirationDate) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.uri = uri;
        this.role = role;
        this.tokenCode = tokenCode;
        this.tokenExpirationDate = tokenExpirationDate;
    }
    get token() {
        if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
            return null;
        }
        return this.tokenCode;
    }
}
export class AdminUser {
}
//# sourceMappingURL=user.model.js.map