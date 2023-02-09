import { Team } from '@shared/types';
import axios from 'axios';

export const getTeams = async () => {
    return axios
        .get<Team[]>('/api/teams')
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const createTeams = async (teams: Team[]) => {
    return axios
        .post<string[]>('/api/teams', teams)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const getTeam = async (team: Team) => {
    return axios
        .get<Team>(`/api/teams/${team.uid}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const createTeam = async (team: Team) => {
    return axios
        .post<Team>(`/api/teams/${team.uid}`, { ...team })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const updateTeams = async (teams: Team[]) => {
    return axios
        .patch<Team>(`/api/teams`, teams)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const updateTeam = async (team: Team) => {
    return axios
        .patch<Team>(`/api/teams/${team.uid}`, { ...team })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const deleteTeams = async (keys: string[]) => {
    return axios
        .delete<Team>(`/api/teams?keys=${keys}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const deleteTeam = async (key: string) => {
    return axios
        .delete<Team>(`/api/teams/${key}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};
