import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: false })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: false })
    organizationId: string;

    @Prop({ required: true })
    role: string;

    @Prop({ required: true, default: true })
    status: boolean;

    @Prop({ required: true })
    password: string;

    @Prop({ required: false })
    info: string;

    @Prop({ required: false })
    address: string;

    @Prop({ required: false, default: '' })
    image: string;

    @Prop({ required: false })
    refreshToken: string;

    @Prop({ required: false, type: String })
    macAddress: string | string[];

    @Prop({ required: true, default: now() })
    createdAt: Date;

    @Prop({ required: false, default: now() })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)