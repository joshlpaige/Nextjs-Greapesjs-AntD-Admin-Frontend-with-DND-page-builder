import { LineModel } from '@server/models';
import { Line } from '@shared/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { http } from '@server/services';
import dayjs from 'dayjs';

export const getLines = async (req: NextApiRequest, res: NextApiResponse) => {
    const { sport } = req.query;
    const option: Partial<Line> = {};
    if (sport) option.sport = sport as string;
    const lines = await LineModel.find(option, '-_id', {
        sort: {
            createdAt: -1,
        },
    }).lean();

    return new http.SuccessResponse(lines).send(res);
};

export const getLine = async (req: NextApiRequest, res: NextApiResponse) => {
    const { key } = req.query;

    const line = await LineModel.findOne({ key: key });

    return new http.SuccessResponse(line).send(res);
};

export const createLines = async (req: NextApiRequest, res: NextApiResponse) => {
    const { lines } = req.body;
    try {
        await LineModel.bulkWrite(
            // @ts-ignore:next-line
            lines.map((Line: Line) => ({
                updateOne: {
                    filter: { uid: Line.uid },
                    update: { $set: Line },
                    upsert: true,
                },
            })),
        );

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const createLine = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const line = await LineModel.create({
            ...req.body,
        });

        return new http.SuccessResponse(line).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const updateLine = async (req: NextApiRequest, res: NextApiResponse) => {
    const e = req.body;
    try {
        const line =
            (await LineModel.findOneAndUpdate({ uid: e.uid } as any, req.body, {
                new: true,
            })) || undefined;

        return new http.SuccessResponse(line).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const deleteLine = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;
    try {
        await LineModel.deleteOne({ uid: uid });

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const deleteLines = async (req: NextApiRequest, res: NextApiResponse) => {
    const { keys } = req.query;
    try {
        await LineModel.deleteMany({ key: keys });

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};

export const updateLines = async (req: NextApiRequest, res: NextApiResponse) => {
    const lines = req.body;
    try {
        await LineModel.bulkWrite(
            // @ts-ignore:next-line
            lines.map((Line: Line) => ({
                updateOne: {
                    filter: { uid: Line.uid },
                    update: { $set: Line },
                    upsert: true,
                },
            })),
        );

        return new http.SuccessResponse({ success: true }).send(res);
    } catch (error) {
        return new http.ErrorResponse(500, error as string).send(res);
    }
};
