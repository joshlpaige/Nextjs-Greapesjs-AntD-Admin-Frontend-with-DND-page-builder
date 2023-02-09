import { accountController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc().post(accountController.signUp);

export default handler;
