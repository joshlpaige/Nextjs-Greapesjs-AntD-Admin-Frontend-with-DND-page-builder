export enum AccountType {
    Admin = 'admin',
    user = 'user',
}

export interface User {
    uid: string;
    email: string;
    fullName: string;
    password: string;
    accountType: AccountType;
}

