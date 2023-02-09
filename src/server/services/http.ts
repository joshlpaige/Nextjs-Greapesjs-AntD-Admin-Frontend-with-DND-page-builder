import { NextApiResponse } from 'next';

export class SuccessResponse {
    payload: any;

    constructor(payload: any) {
        this.payload = payload;
    }

    send(res: NextApiResponse) {
        res.status(200).send(this.payload);
    }
}

export class ErrorResponse {
    code: number;
    message: string;

    constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    send(res: NextApiResponse) {
        res.status(this.code).send({
            success: false,
            error: {
                code: this.code,
                message: this.message,
            },
        });
    }
}
