import { User } from '@shared/types';
import axios from 'axios';

export const signUp = async (user: Partial<User>) => {
    return axios
        .post<User>('/api/account/signup', { ...user })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};
