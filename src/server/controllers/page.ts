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

export const deletePage = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;
    await PageModel.deleteOne({ uid: uid });
    return new http.SuccessResponse({ success: true }).send(res);
};

export const updatePage = async (req: NextApiRequest, res: NextApiResponse) => {
    const { uid } = req.query;
    await PageModel.findOneAndUpdate({ uid: uid }, { ...req.body });
    return new http.SuccessResponse({ success: true }).send(res);
};

export const getPages = async (req: NextApiRequest, res: NextApiResponse) => {
    const { status } = req.query;
    var option: any = {};
    if (status) option.status = status;
    const pages = await PageModel.find(option).lean();
    return new http.SuccessResponse(pages).send(res);
};

export const savePages = async (req: NextApiRequest, res: NextApiResponse) => {
    const { pages } = req.query;
    const option = {};
    await PageModel.find(option).lean();
    return new http.SuccessResponse(pages).send(res);
};
