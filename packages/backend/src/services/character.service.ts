import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Character, CharacterDocument } from 'src/schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private characterModel: Model<CharacterDocument>
  ) { }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findById(id: string): Promise<Character> {
    return this.characterModel.findById(id).exec();
  }

  async create(character: Character): Promise<Character> {
    const createdCharacter = new this.characterModel(character);
    return createdCharacter.save();
  }

  async update(id: string, character: Character): Promise<Character> {
    await this.characterModel.findByIdAndUpdate(id, character);
    return this.characterModel.findById(id).exec();
  }

  async delete(id: string): Promise<Character> {
    const deletedCharacter = await this.characterModel.findById(id).exec();
    await this.characterModel.findByIdAndDelete(id).exec();
    return deletedCharacter;
  }
}
