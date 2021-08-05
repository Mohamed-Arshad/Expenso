import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ExpenseDocument = Expense & Document;

@Schema()
export class Expense {
  @Prop({ required: true })
  ProfileId: string;

  @Prop({ required: true })
  Description: string;

  @Prop({ required: true })
  Amount: number;

  @Prop({ required: true, timestamps: true })
  Time: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);