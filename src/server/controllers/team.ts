import { TeamModel } from '@server/models';
import { Team } from '@shared/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { http } from '@server/services';
import dayjs from 'dayjs';

export const getTeams = async (req: NextApiRequest, res: NextApiResponse) => {
    // const { key } = req.query;

    const teams = await TeamModel.find({}, '-_id', {
        sort: {
            createdAt: -1,
        },
    }).lean();

    return new http.SuccessResponse(teams).send(res);
};

export const getTeam = async (req: NextApiRequest, res: NextApiResponse) => {
    const { key } = req.query;

    const team = await TeamModel.findOne({ key: key });

    return new http.SuccessResponse(team).send(res);
};

export const createTeams = async (req: NextApiRequest, res: NextApiResponse) => {
    const { teams } = req.body;
    try {
        await TeamModel.bulkWrite(
            // @ts-ignore:next-line
            teams.map((team: Team) => ({
                updateOne: {
                    filter: { uid: team.uid },
                    update: { $set: team },
                    upsert: true,
                },
            })),
        );

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const createTeam = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const team = await TeamModel.create({
            ...req.body,
        });

        return new http.SuccessResponse(team).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const updateTeam = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;
    console.log(uid, req.body);
    try {
        const team =
            (await TeamModel.findOneAndUpdate({ uid: uid } as any, req.body, {
                new: true,
            })) || undefined;

        return new http.SuccessResponse(team).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const deleteTeam = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;
    try {
        await TeamModel.deleteOne({ uid: uid });

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const deleteTeams = async (req: NextApiRequest, res: NextApiResponse) => {
    const { keys } = req.query;
    try {
        await TeamModel.deleteMany({ uid: keys });

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const updateTeams = async (req: NextApiRequest, res: NextApiResponse) => {
    const { teams } = req.body;
    try {
        await TeamModel.bulkWrite(
            // @ts-ignore:next-line
            teams.map((team: Team) => ({
                updateOne: {
                    filter: { uid: team.uid },
                    update: { $set: team },
                    upsert: true,
                },
            })),
        );

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

