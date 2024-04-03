import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';

export type CharacterDocument = HydratedDocument<Character>;

@Schema({ timestamps: true })
export class Character {
  @Prop({ required: true })
  label: string;

  @Prop({ default: now() })
  createDate: Date;

  @Prop({ default: now() })
  updateDate: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
