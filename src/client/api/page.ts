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

export const updatePage = async (page: Partial<Page>) => {
    return axios
        .patch<Page>('/api/pages/' + page.uid, { ...page })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const deletePage = async (uid: string) => {
    return axios
        .delete<{ success: boolean }>('/api/pages/' + uid)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const getPages = async (status?: 'published' | 'draft'): Promise<Page[]> => {
    return axios
        .get<Page[]>(`/api/pages${status ? '/?status=' + status : ''}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};
