import { pageController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc().get(pageController.getPages).post(pageController.savePages);

export default handler;
