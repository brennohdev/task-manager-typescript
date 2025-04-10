import mongoose, { Document, Schema} from "mongoose";
import { ProviderEnum, ProviderEnumType } from "../../../domain/enums/accountProvider";

export interface AccountDocuments extends Document {
    provider: ProviderEnumType;
    providerId: string;
    userId: mongoose.Types.ObjectId;
    refreshToken: string | null;
    tokenExpiry: Date | null;
    createdAt: Date;
}

export const accountSchema = new Schema<AccountDocuments>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    provider: {
        type: String,
        enum: Object.values(ProviderEnum),
        required: true,
    },
    providerId: {
        type: String,
        required: true,
        unique: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    tokenExpiry: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(_, ret){
            delete ret.refreshToken;
        }
    }
});

const AccountModel = mongoose.model<AccountDocuments>("Account", accountSchema);
export default AccountModel;