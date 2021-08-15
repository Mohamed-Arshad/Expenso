import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './DTO/createProfile.dto';
import { ProfileRepository } from './profile.repository';
import { Profile } from './Scema/profile.schema';

@Injectable()
export class ProfileService {
    constructor(private profileRepository: ProfileRepository) {}

    async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
        return this.profileRepository.create(createProfileDto);
    }
    async viewAllProfile():Promise<Profile[]> {
        return this.profileRepository.findAll();
    }
    async findProfileById(id):Promise<Profile>{
        return this.profileRepository.findById(id);
    }
}
