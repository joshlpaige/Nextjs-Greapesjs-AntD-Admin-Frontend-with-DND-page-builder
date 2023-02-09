import { teamController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc()
    .get(teamController.getTeam)
    .post(teamController.createTeam)
    .patch(teamController.updateTeam)
    .delete(teamController.deleteTeam);

export default handler;
