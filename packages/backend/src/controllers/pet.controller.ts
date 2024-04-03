import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pet } from 'src/schemas/pet.schema';
import { PetService } from 'src/services/pet.service';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private petsService: PetService) {}

  @Get('getall')
  async findAll(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Get('getbyid/:id')
  async findById(@Param('id') id: string): Promise<Pet> {
    return this.petsService.findById(id);
  }

  @Post('create')
  async create(@Body() pet: Pet): Promise<Pet> {
    return this.petsService.create(pet);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() pet: Pet): Promise<Pet> {
    return this.petsService.update(id, pet);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<Pet> {
    return this.petsService.delete(id);
  }

  @Get('getalldog')
  async findAllDog(): Promise<Pet[]> {
    return this.petsService.findAllDog();
  }

  @Get('getallcat')
  async findAllCat(): Promise<Pet[]> {
    return this.petsService.findAllCat();
  }

  @Get('getallbird')
  async findAllBird(): Promise<Pet[]> {
    return this.petsService.findAllBird();
  }

  @Get('getallreptile')
  async findAllReptile(): Promise<Pet[]> {
    return this.petsService.findAllReptile();
  }

  @Put('love/:id')
  async loveReaction(@Param('id') id: string): Promise<Pet> {
    return this.petsService.loveReaction(id);
  }
}
