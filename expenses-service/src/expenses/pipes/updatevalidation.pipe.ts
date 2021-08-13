import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpdatevalidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(value.Amount!=null){
      if(isNaN(value.Amount) || value.Amount==''){
        throw new BadRequestException(`${value.Amount} is not a valid number`);
      }
    }
    if(value.Description==""){
      throw new BadRequestException(`Description cannot be empty`);
    }
    return value;
  }
}
