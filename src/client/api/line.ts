import { Line } from '@shared/types';
import axios from 'axios';

export const getLines = async (sport?: string) => {
    return axios
        .get<Line[]>(`/api/lines${sport ? `?sport=${sport}` : ''}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const createLines = async (teams: Line[]) => {
    return axios
        .post<string[]>('/api/lines', teams)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const getLine = async (team: Line) => {
    return axios
        .get<Line>(`/api/lines/${team.uid}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const createLine = async (team: Line) => {
    return axios
        .post<Line>(`/api/lines/${team.uid}`, { ...team })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const updateLines = async (lines: Partial<Line>[]) => {
    return axios
        .patch<Line>(`/api/lines`, lines)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const updateLine = async (team: Line) => {
    return axios
        .patch<Line>(`/api/lines/${team.uid}`, { ...team })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const deleteLines = async (keys: string[]) => {
    return axios
        .delete<Line>(`/api/lines?keys=${keys}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const deleteLine = async (key: string) => {
    return axios
        .delete<Line>(`/api/lines/${key}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

