import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, now } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({timestamps: true})
export class Category {
    @Prop({required: true})
    name: string;

    @Prop({required: true, default: true})
    status: boolean;

    @Prop({required: true, default: now()})
    createdAt: Date;

    @Prop({required: false, default: now()})
    updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category)