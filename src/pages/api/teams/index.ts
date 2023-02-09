import { teamController } from '@server/controllers';
import nc from 'next-connect';

const handler = nc()
    .get(teamController.getTeams)
    .post(teamController.createTeams)
    .patch(teamController.updateTeams)
    .delete(teamController.deleteTeams);

export default handler;

export const config = {
    api: {
        responseLimit: false,
    },
};
