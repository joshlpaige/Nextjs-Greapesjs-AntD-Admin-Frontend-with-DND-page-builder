export enum AccountType {
    SuperAdmin = 'super-admin',
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
