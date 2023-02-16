import NextAuth from 'next-auth';
import { NextApiRequest } from 'next';
import { AccountType } from '@shared/enums/User';
import { User } from '@shared/types';

type ISOString = string;

declare module '@microsoft/office-js';
declare module 'react-beautiful-dnd';
declare module '@env';
declare module '*.svg' {
    export function ReactComponent(): any;
}

declare module 'html-to-react';
declare module 'react-file-viewer';

declare module 'next' {
    interface NextApiRequest {
        session?: {
            user: User;
        };
        token?: string;
    }
}

declare module 'next-auth' {
    interface Session {
        user: User;
    }
    interface Token {
        user: User;
    }
}

declare module 'multer-azure-storage' {
    export default class NewClase {}
}

