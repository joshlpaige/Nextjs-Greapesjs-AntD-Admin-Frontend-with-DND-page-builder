import { lineController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc()
    .get(lineController.getLine)
    .post(lineController.createLine)
    .patch(lineController.updateLine)
    .delete(lineController.deleteLine);

export default handler;
