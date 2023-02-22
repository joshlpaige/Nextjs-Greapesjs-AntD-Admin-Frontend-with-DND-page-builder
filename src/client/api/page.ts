import { Page, Team } from '@shared/types';
import axios from 'axios';

export const getPage = async (uid: string) => {
    return axios
        .get<Page>('/api/pages/' + uid)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const savePage = async (page: Page) => {
    return axios
        .post<string[]>('/api/pages/' + page.uid, page)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};
