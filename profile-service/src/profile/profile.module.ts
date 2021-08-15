import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './Scema/profile.schema';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { ProfileService } from './profile.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }])],
    controllers: [ProfileController],
    providers: [ProfileRepository, ProfileService],
})
export class ProfileModule {}
