import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet, PetDocument } from 'src/schemas/pet.schema';

@Injectable()
export class PetService {
  constructor(
    @InjectModel(Pet.name)
    private petModel: Model<PetDocument>
  ) { }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findById(id: string): Promise<Pet> {
    return this.petModel.findById(id).exec();
  }

  async create(pet: Pet): Promise<Pet> {
    const createdPet = new this.petModel(pet);
    return createdPet.save();
  }

  async update(id: string, pet: Pet): Promise<Pet> {
    await this.petModel.findByIdAndUpdate(id, pet);
    return this.petModel.findById(id).exec();
  }

  async delete(id: string): Promise<Pet> {
    const deletedPet = await this.petModel.findById(id).exec();
    await this.petModel.findByIdAndDelete(id).exec();
    return deletedPet;
  }

  async findAllDog(): Promise<Pet[]> {
    return this.petModel.find({ petType: '64ecb73ed3988b6470ea3687' }).exec();
  }

  async findAllCat(): Promise<Pet[]> {
    return this.petModel.find({ petType: '64ec9c3a0b80aac7042c8802' }).exec();
  }

  async findAllBird(): Promise<Pet[]> {
    return this.petModel.find({ petType: '64ef2bdf577ab6435f7cfb1a' }).exec();
  }

  async findAllReptile(): Promise<Pet[]> {
    return this.petModel.find({ petType: '64ef2be7577ab6435f7cfb1c' }).exec();
  }

  async loveReaction(id: string): Promise<Pet> {
    const pet = await this.petModel.findById(id).exec();
    pet.loveCount = pet.loveCount + 1;
    return pet.save();
  }
}
