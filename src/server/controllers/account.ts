import { NextApiRequest, NextApiResponse } from 'next';
import { UserModel } from '@server/models';
import { http } from '@server/services';
import { uniqueId } from '@shared/utils';
import jwt from 'jsonwebtoken';
import { AccountType, User as UserType } from '@shared/types';

export const checkLogin = async (credentials: any) => {
    const user = await UserModel.findOne({ email: credentials.email }, '-__v -_id').lean();
    if (!user) return { success: false };
    const decoded = jwt.verify(user.password || '', process.env.JWT_SECRET!);
    if (decoded !== credentials.password) return { success: false };
    // @ts-ignore
    const { password, ...sessionUser } = user;

    return { success: true, user: sessionUser };
};

export const signUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const credentials = req.body;
    let payload = { ...credentials };
    const user = await UserModel.findOne({ email: credentials.email });
    if (user) {
        return new http.ErrorResponse(409, 'Email is in use').send(res);
    }

    const id = uniqueId();
    const password = jwt.sign(credentials.password, process.env.JWT_SECRET!);
    const createdUser = await UserModel.create({ ...payload, uid: id, password: password });

    return new http.SuccessResponse(createdUser).send(res);
};
