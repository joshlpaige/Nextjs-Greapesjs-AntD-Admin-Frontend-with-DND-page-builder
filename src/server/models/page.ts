import { mongoose, Schema } from '@server/services/mongoose';
import { Page } from '@shared/types';

const PageSchema = new Schema(
    {
        uid: Schema.Types.String,
        title: Schema.Types.String,
        html: Schema.Types.String,
        css: Schema.Types.String,
        status: Schema.Types.String,
    },
    {
        timestamps: true,
    },
);

const PageModel = mongoose.models.Pages || mongoose.model<Page>('Pages', PageSchema);

export default PageModel as mongoose.Model<Page, {}, {}>;
