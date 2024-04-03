// section.service.ts

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Section, SectionDocument } from 'src/schemas/section.schema';

@Injectable()
export class SectionService {
    constructor(
        @InjectModel(Section.name) private sectionModel: Model<SectionDocument>,
    ) { }

    // async create(sections: Section[]): Promise<Section[]> {
    //     const createdSections: Section[] = [];      
    //     for (const section of sections) {
    //       await this.checkSectionNameNotExists(section.name, section.courseId);
    //       const createdSection = new this.sectionModel(section);
    //       createdSections.push(await createdSection.save());
    //     }
    //     return createdSections;
    //   }

    async create(sections: Section[]): Promise<Section[]> {
        const createdSections: Section[] = [];

        for (const section of sections) {
            await this.checkSectionNameNotExists(section.name, section.courseId);
            const lastSection = await this.sectionModel
                .findOne({ courseId: section.courseId })
                .sort({ positions: -1 })
                .exec();
            section.positions = lastSection ? lastSection.positions + 1 : 1;
            const createdSection = new this.sectionModel(section);
            createdSections.push(await createdSection.save());
        }

        return createdSections;
    }


    async edit(sectionId: string, updatedSection: Section): Promise<Section> {
        await this.checkSectionNameNotExists(updatedSection.name, updatedSection.courseId, sectionId);
        const existingSection = await this.sectionModel.findByIdAndUpdate(sectionId, updatedSection, {
            new: true
        }).exec();

        if (!existingSection) {
            throw new NotFoundException(`Section with ID ${sectionId} not found`);
        }
        return existingSection;
    }

    async getAll(): Promise<Section[]> {
        return this.sectionModel.find().exec();
    }

    async getById(sectionId: string): Promise<Section> {
        const section = await this.sectionModel.findById(sectionId).exec();
        if (!section) {
            throw new NotFoundException(`Section with id ${sectionId} not found`);
        }
        return section;
    }

    async getByCourseId(courseId: string): Promise<Section[]> {
        const section = await this.sectionModel.find({ courseId}).exec();
        if (!section) {
            throw new NotFoundException(`Section with id ${section} not found`);
        }
        return section;
    }

    async getSectionByStatus(isActive: boolean): Promise<Section[]> {
        return this.sectionModel.find({ isActive }).exec();
    }

    async getSectionByCourseIdAndStatus(courseId: string, isActive: boolean,): Promise<Section[]> {
        return this.sectionModel.find({ courseId, isActive }).exec();
    }

    async delete(sectionId: string): Promise<void> {
        await this.getById(sectionId);
        await this.sectionModel.findByIdAndDelete(sectionId).exec();
    }

    private async checkSectionNameNotExists(name: string, courseId: any, excludedSectionId?: string): Promise<void> {
        const existingSection = await this.sectionModel
            .findOne({ name, courseId, _id: { $ne: excludedSectionId } })
            .exec();

        if (existingSection) {
            throw new ConflictException(`Section ${name} already exists for the given course`);
        }
    }
}
