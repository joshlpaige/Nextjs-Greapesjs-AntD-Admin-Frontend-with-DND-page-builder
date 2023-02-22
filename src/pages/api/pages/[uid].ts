import { pageController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc().get(pageController.getPage).post(pageController.savePage);

export default handler;
