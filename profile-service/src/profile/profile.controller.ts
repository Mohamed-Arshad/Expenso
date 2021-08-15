import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProfileDto } from './DTO/createProfile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './Scema/profile.schema';

@Controller('profile')
export class ProfileController {
    constructor(private profileService:ProfileService){}

    @Post()
    async addProfile(@Body() createProfileDto:CreateProfileDto):Promise<Profile>{
        return this.profileService.createProfile(createProfileDto);
    }

    @Get()
    async viewAllProfile():Promise<Profile[]>{
        return this.profileService.viewAllProfile();
    }

    @Get('/:id')
    async viewProfileById(@Param() id:string):Promise<Profile>{
        return this.profileService.findProfileById(id);
    }
}
