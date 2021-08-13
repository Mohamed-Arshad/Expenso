import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
    @Prop({ required: true })
    ProfileId: string;
  
    @Prop({ required: true })
    Name: string;
  
    @Prop({ required: true })
    MaxAmountLimit: number;
  
    @Prop({ required: true, timestamps: true })
    CreatedDate: Date;

    @Prop({ required: true })
    Expenses:string[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);