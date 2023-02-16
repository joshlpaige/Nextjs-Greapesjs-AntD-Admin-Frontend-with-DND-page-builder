import { mongoose, Schema } from '@server/services/mongoose';
import { Line } from '@shared/types';

const LineSchema = new Schema(
    {
        uid: Schema.Types.String,
        team1: Schema.Types.String,
        number1: Schema.Types.Number,
        team2: Schema.Types.String,
        number2: Schema.Types.Number,
        odds1: Schema.Types.String,
        odds2: Schema.Types.String,
        date: Schema.Types.String,
        time: Schema.Types.String,
        sport: Schema.Types.String,
        editedAt: Schema.Types.String,
        broadcast: Schema.Types.String,
    },
    {
        timestamps: true,
    },
);

const LineModel = mongoose.models.Lines || mongoose.model<Line>('Lines', LineSchema);

export default LineModel as mongoose.Model<Line, {}, {}>;
