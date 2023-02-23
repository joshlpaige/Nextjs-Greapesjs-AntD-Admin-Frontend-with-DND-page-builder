import { pageController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc()
    .get(pageController.getPage)
    .post(pageController.savePage)
    .delete(pageController.deletePage)
    .patch(pageController.updatePage);

export default handler;
