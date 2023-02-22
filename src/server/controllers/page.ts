import { PageModel } from '@server/models';
import { http } from '@server/services';
import { NextApiRequest, NextApiResponse } from 'next';

export const savePage = async (req: NextApiRequest, res: NextApiResponse) => {
    await PageModel.create({ ...req.body });
    return new http.SuccessResponse({ success: true }).send(res);
};

export const getPage = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;
    const page = await PageModel.findOne({ uid: uid }).lean();
    return new http.SuccessResponse(page).send(res);
};
