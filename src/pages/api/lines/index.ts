import { lineController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc()
    .get(lineController.getLines)
    .post(lineController.createLines)
    .patch(lineController.updateLines)
    .delete(lineController.deleteLines);

export default handler;

export const config = {
    api: {
        responseLimit: false,
    },
};
