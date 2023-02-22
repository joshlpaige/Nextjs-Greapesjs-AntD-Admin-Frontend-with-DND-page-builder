import { mongoose, Schema } from '@server/services/mongoose';
import { Line } from '@shared/types';

const PageSchema = new Schema(
    {
        uid: Schema.Types.String,
        title: Schema.Types.String,
        content: Schema.Types.String,
        status: Schema.Types.String,
    },
    {
        timestamps: true,
    },
);

const PageModel = mongoose.models.Pages || mongoose.model<Line>('Pages', PageSchema);

export default PageModel as mongoose.Model<Line, {}, {}>;
