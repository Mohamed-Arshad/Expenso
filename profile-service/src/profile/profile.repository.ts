import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProfileDto } from './DTO/createProfile.dto';
import { Profile, ProfileDocument } from './Scema/profile.schema';

@Injectable()
export class ProfileRepository {
    constructor(@InjectModel(Profile.name) private ProfileModel: Model<ProfileDocument>) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    return new this.ProfileModel(createProfileDto).save();
  }

  async findAll():Promise<Profile[]>{
      return this.ProfileModel.find();
  }

  async findById(id):Promise<Profile>{
    return this.ProfileModel.findById(id);
  }

}
