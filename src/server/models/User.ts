import { mongoose, Schema } from '@server/services/mongoose';
import { User } from '@shared/types';

const UserSchema = new Schema(
    {
        uid: Schema.Types.String,
        email: Schema.Types.String,
        fullName: Schema.Types.String,
        password: Schema.Types.String,
        accountType: Schema.Types.String,
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.models.Users || mongoose.model<User>('Users', UserSchema);

export default UserModel as mongoose.Model<User, {}, {}>;
