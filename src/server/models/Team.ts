import { mongoose, Schema } from '@server/services/mongoose';
import { Team } from '@shared/types';

const TeamSchema = new Schema(
    {
        uid: Schema.Types.String,
        name: Schema.Types.String,
        sport: Schema.Types.String,
    },
    {
        timestamps: true,
    },
);

const TeamModel = mongoose.models.Teams || mongoose.model<Team>('Teams', TeamSchema);

export default TeamModel as mongoose.Model<Team, {}, {}>;
