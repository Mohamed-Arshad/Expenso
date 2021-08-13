import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ExpenseManagerDocument = ExpenseManager & Document;

@Schema()
export class ExpenseManager {
  @Prop({ required: true })
  ProfileId: string;
  
  @Prop({ required: true })
  MaxAmountLimit: number;
  
  @Prop({ required: true, timestamps: true })
  CreatedDate: Date;

  @Prop({ required: true })
  Categories:string[];
}

export const ExpenseManagerSchema = SchemaFactory.createForClass(ExpenseManager);
