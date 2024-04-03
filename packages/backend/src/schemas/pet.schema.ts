import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { now, HydratedDocument } from 'mongoose';
import { Character } from './character.schema';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true })
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true })
  character: Character;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  favorite: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: 0 })
  loveCount: number;

  @Prop({ default: now() })
  createDate: Date;

  @Prop({ default: now() })
  updateDate: Date;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
